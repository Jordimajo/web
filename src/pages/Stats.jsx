import React from 'react';
import {
    diasJugadosCompletamente,
    puntuacionMedia,
    diasObjetivoSuperado80,
    diasObjetivoSuperado50
} from '../utils/storage'; // Importamos las funciones que necesitamos.
import './Stats.css';

const Stats = () => {
    return (
        <div>
            <h2>Estadísticas</h2>
            <div className="contenedor-estadisticas">
                <div className="estadistica">
                    <img src="path/to/icon1.png" alt="Días jugados" className="estadistica-icono"/>
                    <h3>Días jugados</h3>
                    <p>{diasJugadosCompletamente()}</p>
                </div>

                <div className="estadistica">
                    <img src="path/to/icon2.png" alt="Puntuación media" className="estadistica-icono"/>
                    <h3>Puntuación media</h3>
                    <p>{puntuacionMedia()}</p>
                </div>

                <div className="estadistica">
                    <img src="path/to/icon3.png" alt="Reto 50 puntos" className="estadistica-icono"/>
                    <h3>Reto 50 puntos</h3>
                    <p>{diasObjetivoSuperado50()}</p>
                </div>

                <div className="estadistica">
                    <img src="path/to/icon4.png" alt="Reto 80 puntos" className="estadistica-icono"/>
                    <h3>Reto 80 puntos</h3>
                    <p>{diasObjetivoSuperado80()}</p>
                </div>
            </div>
        </div>
    );
}

export default Stats;
