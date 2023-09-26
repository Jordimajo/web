import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Producto from '../components/Producto';
import PrecioSlider from '../components/PrecioSlider';
import { comprobarYActualizarPuntos } from '../utils/comprobar';
import { haJugadoElDia, obtenerPuntosDelDia } from '../utils/storage';
import { cargarProductosDelDia } from '../utils/carga';
import Puntuacion from '../components/Puntuacion';
import ResumenProducto from '../components/ResumenProducto';
import ResumenFinal from '../components/ResumenFinal';



const PlayDay = () => {
    const { fecha } = useParams();
    const [productoActual, setProductoActual] = useState(null);
    const [precioEstimado, setPrecioEstimado] = useState(0);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [puntosRecientes, setPuntosRecientes] = useState(0);
    const [mostrarResumenFinal, setMostrarResumenFinal] = useState(false);
    const [productosDelDia, setProductosDelDia] = useState([]);

    const cargarProductoPorIndice = useCallback((indice) => {
        cargarProductosDelDia(new Date(fecha)).then(productos => {
            setProductosDelDia(productos);
            if (indice !== -1 && productos.length > indice) {
                setProductoActual(productos[indice]);
                setMostrarResumenFinal(false);
            } else if (indice === -1) {
                setProductoActual(null);
                setMostrarResumenFinal(true);
            }
        });
    }, [fecha]);
    

    useEffect(() => {
        const indiceProducto = haJugadoElDia(fecha);
        cargarProductoPorIndice(indiceProducto);
    }, [fecha, cargarProductoPorIndice]);
    

    const comprobarPrecio = () => {
        const puntosGanados = comprobarYActualizarPuntos(fecha, precioEstimado, productoActual.precio);
        setPuntosRecientes(puntosGanados);
        setMostrarResultado(true);
    };


    const irAlSiguienteProducto = () => {
        const nuevoIndice = haJugadoElDia(fecha);
        cargarProductoPorIndice(nuevoIndice);
        setMostrarResultado(false);
    };


    return (
        <div className="Playday">
            {productoActual ? (
                <div>
                    <Puntuacion
                        puntos={obtenerPuntosDelDia(fecha)}
                        indiceSiguienteProducto={haJugadoElDia(fecha)}
                        totalProductos={5}
                    />

                    {mostrarResultado ? (
                        <ResumenProducto
                            puntos={puntosRecientes}
                            descuentos={productoActual.descuentos}
                            url={productoActual.url}
                            irAlSiguienteProducto={irAlSiguienteProducto}
                            comercio={productoActual.comercio}
                        />
                    ) : (
                        <Producto producto={productoActual} />
                    )}

                    <PrecioSlider
                        precioEstimado={precioEstimado}
                        setPrecioEstimado={setPrecioEstimado}
                        precioReal={productoActual.precio}
                        precioCorrecto={mostrarResultado ? productoActual.precio : null}
                    />

                    {!mostrarResultado && <button onClick={comprobarPrecio}>Comprobar</button>}

                </div>
            ) : mostrarResumenFinal ? (
                <ResumenFinal
                    productosDelDia={productosDelDia}
                    puntuacionDelDia={obtenerPuntosDelDia(fecha)}
                    fecha={fecha}
                />
            ) : null}
        </div>
    );

}

export default PlayDay;