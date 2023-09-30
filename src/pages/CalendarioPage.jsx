import React, { useState, useEffect } from 'react';
import { isToday, format, addDays, isBefore } from 'date-fns';
import { resumenDiasJugados } from '../utils/storage';
import './CalendarioPage.css';
import { useNavigate } from 'react-router-dom';
import { getUTCDate } from '../utils/carga';

function Calendario() {
    const [days, setDays] = useState([]);
    const diasJugados = resumenDiasJugados();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            const startDay = new Date(2023, 8, 13);
            const today = await getUTCDate();
    
            const calendarDays = [];
    
            for (let day = startDay; isBefore(day, today) || isToday(day); day = addDays(day, 1)) {
                calendarDays.push(day);
            }
    
            setDays(calendarDays);
        };
    
        fetchData();
    }, []);
    

    const handleDayClick = (formattedDate) => {
        navigate(`/jugar/${formattedDate}`);
    };

    const generateDaysByMonth = days => {
        const groupedDays = days.reduce((acc, day) => {
            const monthYearKey = format(day, 'MMMM yyyy');
            if (!acc[monthYearKey]) {
                acc[monthYearKey] = [];
            }
            acc[monthYearKey].push(day);
            return acc;
        }, {});
        
        return groupedDays;
    };

    const daysByMonth = generateDaysByMonth(days);
    const lastFourMonths = Object.entries(daysByMonth).slice(-4).reverse();


    return (
        <div className="calendar">
            <div className="legend-container">
                <div className="legend">
                    <div className="legend-item">
                        <span className="color-box" style={{ backgroundColor: 'green' }}></span>
                        Reto disponible
                    </div>
                    <div className="legend-item">
                        <span className="color-box" style={{ backgroundColor: 'red' }}></span>
                        Reto jugado
                    </div>
                    <div className="legend-item">
                        <span className="color-box" style={{ backgroundColor: 'orange' }}></span>
                        Reto sin terminar
                    </div>
                </div>
            </div>

            <div className="months-container">
                {lastFourMonths.map(([monthYear, daysInMonth]) => (
                    <div className="month" key={monthYear}>
                        <div className="month-name">{monthYear}</div>
                        {daysInMonth.map(day => {
                            const formattedDate = format(day, 'yyyy-MM-dd');
                            const estado = diasJugados[formattedDate];
                            let color;

                            switch (estado) {
                                case 'comenzado':
                                    color = 'orange';
                                    break;
                                case 'completado':
                                    color = 'red';
                                    break;
                                default:
                                    color = 'green';
                                    break;
                            }

                            return (
                                <button
                                    className="day-button"
                                    key={formattedDate}
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleDayClick(formattedDate)}
                                >
                                    {format(day, 'dd')}
                                </button>
                            );
                        })}

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Calendario;
