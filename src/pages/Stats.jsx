import React from 'react';
import {
    diasJugadosCompletamente,
    puntuacionMedia,
    diasObjetivoSuperado80,
    diasObjetivoSuperado50
} from '../utils/storage'; // Importamos las funciones que necesitamos.
import './Stats.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarRateIcon from '@mui/icons-material/StarRate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Stats = () => {
    return (
        <div>
            <h2>Estadísticas</h2>
            <div className="contenedor-estadisticas">
                <div className="estadistica">
                    <CalendarTodayIcon className="estadistica-icono"/>
                    <h3>Días jugados</h3>
                    <p>{diasJugadosCompletamente()}</p>
                </div>

                <div className="estadistica">
                    <StarRateIcon className="estadistica-icono"/>
                    <h3>Puntuación media</h3>
                    <p>{puntuacionMedia()}</p>
                </div>

                <div className="estadistica">
                    <TrendingUpIcon className="estadistica-icono"/>
                    <h3>Reto 50 puntos</h3>
                    <p>{diasObjetivoSuperado50()}</p>
                </div>

                <div className="estadistica">
                    <CheckCircleIcon className="estadistica-icono"/>
                    <h3>Reto 80 puntos</h3>
                    <p>{diasObjetivoSuperado80()}</p>
                </div>
            </div>
        </div>
    );
}

export default Stats;
