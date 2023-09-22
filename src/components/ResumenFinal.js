import React, { useState, useEffect } from 'react';
import { obtenerDatosDelDia } from '../utils/storage';
import './ResumenFinal.css';

const ResumenFinal = ({ productosDelDia, puntuacionDelDia, fecha }) => {

    const generarTextoEnlace = (comercio) => {
        if (comercio === "Amazon") {
            return "Comprar ahora en Amazon.es";
        } else if (comercio === "Otros") {
            return "Comprar ahora aquí";
        } else {
            return `Comprar ahora en ${comercio}`;
        }
    }

    const puntosDelDia = obtenerDatosDelDia(fecha);

    const tiempoHastaMedianocheUTC = () => {
        const ahora = new Date();
        const medianocheUTC = new Date(Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate() + 1));
        return (medianocheUTC - ahora) / 1000; // Diferencia en segundos
    };

    const [time, setTime] = useState(tiempoHastaMedianocheUTC());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toFixed(0).toString().padStart(2, '0'); // Añade toFixed(0) aquí
            
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div>
            <h2>Resumen Final del Día</h2>
            <h3>Puntuación total del día: {puntuacionDelDia}</h3>
            <h3>Próximo reto en: {formatTime(time)}</h3>
            <ul className="lista-productos">
                {productosDelDia.map((producto, index) => (
                    <li key={producto.id} className="producto">
                        <h4>{producto.nombre}</h4>
                        <img
                            src={`/images/${producto.imagen}`}
                            alt={producto.nombre}
                            className="producto-imagen"
                        />
                        <p>Puntos obtenidos: {puntosDelDia ? puntosDelDia[index] : 0}</p>
                        <h5>{producto.precio}€</h5> {/* Aquí se añade el precio */}
                        <a
                            href={producto.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button"
                        >
                            {generarTextoEnlace(producto.comercio)}
                        </a>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default ResumenFinal;


