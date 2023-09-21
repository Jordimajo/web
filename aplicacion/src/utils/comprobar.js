import { calcularPuntos } from './puntos';
import { actualizarPuntosDelProducto, haJugadoElDia } from './storage';

export const comprobarYActualizarPuntos = (fecha, precioEstimado, precioReal) => {
    const puntos = calcularPuntos(precioReal, precioEstimado);
    actualizarPuntosDelProducto(fecha, haJugadoElDia(fecha), puntos);
    return puntos;
};
