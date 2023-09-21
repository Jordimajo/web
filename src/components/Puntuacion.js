import React from 'react';
import './Puntuacion.css';

const Puntuacion = ({ puntos, indiceSiguienteProducto, totalProductos }) => {
    // Si indiceSiguienteProducto es -1, significa que todos los productos han sido jugados.
    const productosRestantes = indiceSiguienteProducto === -1 ? 0 : totalProductos - indiceSiguienteProducto;
    
    let maxPuntosPosibles;
    if (productosRestantes === 0) {
        // Estamos después del último producto
        maxPuntosPosibles = 100;
    } else if (productosRestantes === totalProductos) {
        // Estamos en el primer producto
        maxPuntosPosibles = 0;
    } else {
        // Estamos en cualquier otro producto
        maxPuntosPosibles = (totalProductos - productosRestantes) * 20;
    }

    return (
        <div className="puntuacion">
            <span>Productos restantes: {productosRestantes} de {totalProductos}</span>
            <div className="puntuacion-bar-container">
                <div className="puntuacion-bar-background">
                    <div className="puntuacion-bar-fill" style={{ width: `${(puntos / maxPuntosPosibles) * 100}%` }}></div>
                </div>
                <span>{puntos}/{maxPuntosPosibles} puntos</span>
            </div>
        </div>
    );
}

export default Puntuacion;










