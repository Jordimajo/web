import React, { useCallback, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Producto from './components/Producto';
import PrecioSlider from './components/PrecioSlider';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
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
import Cookies from './pages/Cookies';
import ReactGA from 'react-ga';
import Tutorial from './pages/Tutorial';
import Contacto from './pages/Contacto';


const App = () => {
  const [productoActual, setProductoActual] = useState(null);
  const [precioEstimado, setPrecioEstimado] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [fechaHoy, setFechaHoy] = useState("");
  const [puntosRecientes, setPuntosRecientes] = useState(0);
  const [mostrarResumenFinal, setMostrarResumenFinal] = useState(false);
  const [productosDelDia, setProductosDelDia] = useState([]);

  ReactGA.initialize('G-WBY5JSRVDE');
  const Analytics = () => {
    const location = useLocation();

    useEffect(() => {
      ReactGA.pageview(location.pathname + location.search);
    }, [location]);

    return null;
  };

  useEffect(() => {
    const fetchFechaUTC = async () => {
      const fechaUTC = await getUTCDate();
      const fechaFormateada = `${fechaUTC.getFullYear()}-${String(fechaUTC.getMonth() + 1).padStart(2, '0')}-${String(fechaUTC.getDate()).padStart(2, '0')}`;
      setFechaHoy(fechaFormateada);
    };
    fetchFechaUTC();
  }, []);

  const cargarProductoPorIndice = useCallback((indice) => {
    const fechaObjetoLocal = new Date(fechaHoy);
    cargarProductosDelDia(fechaObjetoLocal).then(productos => {
      setProductosDelDia(productos);
      if (indice !== -1 && productos.length > indice) {
        setProductoActual(productos[indice]);
        setMostrarResumenFinal(false);
      } else if (indice === -1) {
        setProductoActual(null);
        setMostrarResumenFinal(true);
      }
    });
  }, [fechaHoy, setProductosDelDia, setProductoActual, setMostrarResumenFinal]);




  useEffect(() => {
    if (fechaHoy) {
      const indiceProducto = haJugadoElDia(fechaHoy);
      cargarProductoPorIndice(indiceProducto);
    }
  }, [fechaHoy, cargarProductoPorIndice]);



  const comprobarPrecio = () => {
    ReactGA.event({
      category: 'Juego',
      action: 'Botón comprobarPrecio presionado',
    });

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
      <Analytics />
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

                {!mostrarResultado && <button className="btn" onClick={comprobarPrecio}>Comprobar</button>}

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
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );

}


export default App;
