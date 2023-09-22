import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Producto from './components/Producto';
import PrecioSlider from './components/PrecioSlider';
import Header from './components/layout/Header';
import { comprobarYActualizarPuntos } from './utils/comprobar';
import { haJugadoElDia, obtenerPuntosDelDia } from './utils/storage';
import { cargarProductosDelDia, getUTCDate } from './utils/carga';
import Puntuacion from './components/Puntuacion';
import ResumenProducto from './components/ResumenProducto';
import CalendarioPage from './pages/CalendarioPage';
import PlayDay from './pages/PlayDay';
import Stats from './pages/Stats';
import ResumenFinal from './components/ResumenFinal';
import Legal from './pages/Legal';


const App = () => {
  const [productoActual, setProductoActual] = useState(null);
  const [precioEstimado, setPrecioEstimado] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const fechaUTC = getUTCDate();
  const fechaHoy = `${fechaUTC.year}-${String(fechaUTC.month + 1).padStart(2, '0')}-${String(fechaUTC.day).padStart(2, '0')}`;
  const [puntosRecientes, setPuntosRecientes] = useState(0);
  const [mostrarResumenFinal, setMostrarResumenFinal] = useState(false);
  const [productosDelDia, setProductosDelDia] = useState([]);

  const cargarProductoPorIndice = (indice) => {
    cargarProductosDelDia().then(productos => {
      setProductosDelDia(productos);
      if (indice !== -1 && productos.length > indice) {
        setProductoActual(productos[indice]);
        setMostrarResumenFinal(false);
      } else if (indice === -1) {
        setProductoActual(null);
        setMostrarResumenFinal(true);
      }
    });
  };

  useEffect(() => {
    const indiceProducto = haJugadoElDia(fechaHoy);
    cargarProductoPorIndice(indiceProducto);
  }, [fechaHoy]);

  const comprobarPrecio = () => {
    const puntosGanados = comprobarYActualizarPuntos(fechaHoy, precioEstimado, productoActual.precio);
    setPuntosRecientes(puntosGanados);
    setMostrarResultado(true);
  };


  const irAlSiguienteProducto = () => {
    const nuevoIndice = haJugadoElDia(fechaHoy);
    cargarProductoPorIndice(nuevoIndice);
    setMostrarResultado(false);
  };


  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            productoActual ? (
              <div>
                <Puntuacion
                  puntos={obtenerPuntosDelDia(fechaHoy)}
                  indiceSiguienteProducto={haJugadoElDia(fechaHoy)}
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
                puntuacionDelDia={obtenerPuntosDelDia(fechaHoy)}
                fecha={fechaHoy}
              />
            ) : null
          } exact />
          <Route path="/calendario" element={<CalendarioPage />} />
          <Route path="/jugar/:fecha" element={<PlayDay />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </div>
    </Router>
  );

}


export default App;
