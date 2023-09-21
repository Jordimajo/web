import React, { useState } from 'react';
import './Producto.css'; 

const Producto = ({ producto }) => {
  const [descripcionDesplegada, setDescripcionDesplegada] = useState(false);

  return (
    <div className="producto">
      <img 
        src={`/images/${producto.imagen}`} 
        alt={producto.nombre} 
        className="producto-imagen"
      />
      <h2>{producto.nombre}</h2>
      <button onClick={() => setDescripcionDesplegada(!descripcionDesplegada)}>
        Descripción {descripcionDesplegada ? "-" : "+"}
      </button>
      {descripcionDesplegada && <p className="producto-descripcion">{producto.descripcion}</p>}
    </div>
  );
};

export default Producto;
