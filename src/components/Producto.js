import React, { useState } from 'react';
import './Producto.css';
import Modal from './Modal';

const Producto = ({ producto }) => {
  const [descripcionDesplegada, setDescripcionDesplegada] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleImageClick = () => {
    setModalAbierto(true);
  }

  return (
    <div className="producto">
      <img 
        src={`/images/${producto.imagen}`} 
        alt={producto.nombre} 
        className="producto-imagen"
        onClick={handleImageClick}
        onTouchStart={handleImageClick} 
      />
      <h2>{producto.nombre}</h2>
      <button className="btn" onClick={() => setDescripcionDesplegada(!descripcionDesplegada)}>
        Descripción {descripcionDesplegada ? "-" : "+"}
      </button>
      {descripcionDesplegada && <p className="producto-descripcion">{producto.descripcion}</p>}
      {modalAbierto && (
        <Modal onClose={() => setModalAbierto(false)}>
          <img src={`/images/${producto.imagen}`} alt={producto.nombre} style={{ maxWidth: '90%', maxHeight: '80vh' }} />
        </Modal>
      )}
    </div>
  );
};

export default Producto;
