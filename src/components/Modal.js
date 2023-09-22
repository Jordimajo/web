import React from 'react';
import './Modal.css';

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button className="modal-close-button" onClick={onClose}>X</button> {/* Botón de cierre */}
      </div>
    </div>
  );
};

export default Modal;
