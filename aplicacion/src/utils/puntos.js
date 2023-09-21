export const calcularPuntos = (precioReal, precioUsuario) => {
    const diferenciaPorcentual = Math.abs(precioReal - precioUsuario) / precioReal * 100;

    if (diferenciaPorcentual === 0) {
        return 20;
    } else if (diferenciaPorcentual <= 5) {
        return 18;
    }

    const segmentos = Math.ceil(diferenciaPorcentual / 5);

    const puntos = 20 - (2 * segmentos);

    return puntos > 1 ? puntos : 1;
}



