import React from 'react';
import './ResumenProducto.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const ResumenProducto = ({ puntos, descuentos, url, irAlSiguienteProducto, comercio }) => {

  const compartirMensaje = "¿Eres capaz de adivinar el precio de estos productos?. Juega Gratis, 5 nuevos productos cada día.";

  const generarTextoEnlace = (comercio) => {
    if (comercio === "Amazon") {
      return "Comprar ahora en Amazon.es";
    } else if (comercio === "Otros") {
      return "Comprar ahora aquí";
    } else {
      return `Comprar ahora en ${comercio}`;
    }
  }

  return (
    <div className="resultado">
      <h2>¡Enhorabuena!</h2>
      <p>Has conseguido {puntos} puntos.</p>
      <h3>¿Cómo consigo esta oferta?</h3>
      <p>{descuentos}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="enlace-tienda">{generarTextoEnlace(comercio)}</a>
      
      <h3>Comparte el juego en redes sociales:</h3>
      
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
        <FacebookIcon className="icono-red-social"/>
      </a>
      <a href={`https://twitter.com/intent/tweet?text=${compartirMensaje}&url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
        <TwitterIcon className="icono-red-social"/>
      </a>
      <a href="https://www.instagram.com/preciosisimo.es/" target="_blank" rel="noopener noreferrer">
        <InstagramIcon className="icono-red-social"/>
      </a>
      
      <button className="btn" onClick={irAlSiguienteProducto}>Siguiente Producto</button>
    </div>
  );
}

export default ResumenProducto;
