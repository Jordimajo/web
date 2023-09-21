export const actualizarPuntosDelProducto = (fecha, indiceProducto, puntos) => {
    const almacenados = JSON.parse(localStorage.getItem("datosJuego") || "{}");

    // Si la fecha no existe en almacenados, inicializarla
    if (!almacenados[fecha]) {
        almacenados[fecha] = [0, 0, 0, 0, 0];
    }

    // Actualizar los puntos del producto en la fecha dada
    almacenados[fecha][indiceProducto] = puntos;

    localStorage.setItem("datosJuego", JSON.stringify(almacenados));
};

export const obtenerDatosDelDia = (fecha) => {
    const almacenados = JSON.parse(localStorage.getItem("datosJuego") || "{}");
    return almacenados[fecha] || null;
};

export const obtenerTodosLosDatos = () => {
    return JSON.parse(localStorage.getItem("datosJuego") || "{}");
};

export const haJugadoElDia = (fecha) => {
    const almacenados = JSON.parse(localStorage.getItem("datosJuego") || "{}");
    const datosDelDia = almacenados[fecha] || [0, 0, 0, 0, 0];

    // Encuentra el índice del primer producto que aún no ha sido jugado (tiene puntos 0).
    const indiceSiguienteProducto = datosDelDia.indexOf(0);

    // Si todos los productos han sido jugados, devuelve -1. Si no, devuelve el índice del siguiente producto.
    return indiceSiguienteProducto === -1 ? -1 : indiceSiguienteProducto;
};

export const obtenerPuntosDelDia = (fecha) => {
    const datosDelDia = obtenerDatosDelDia(fecha);
    if (!datosDelDia) {
        return 0;
    }
    return datosDelDia.reduce((total, puntos) => total + puntos, 0);
};


export const resumenDiasJugados = () => {
    const almacenados = JSON.parse(localStorage.getItem("datosJuego") || "{}");
    const resumen = {};

    for (const fecha in almacenados) {
        const juegosDelDia = almacenados[fecha];

        if (juegosDelDia.every(puntos => puntos === 0)) {
            resumen[fecha] = 'no jugado';
        } else if (juegosDelDia.some(puntos => puntos === 0)) {
            resumen[fecha] = 'comenzado';
        } else {
            resumen[fecha] = 'completado';
        }
    }

    return resumen;
};

export const diasJugadosCompletamente = () => {
    const resumen = resumenDiasJugados();
    return Object.values(resumen).filter(estado => estado === 'completado').length;
};

export const diasObjetivoSuperado50 = () => {
    const datos = obtenerTodosLosDatos();
    let count = 0;

    for (const fecha in datos) {
        if (obtenerPuntosDelDia(fecha) >= 50) {
            count++;
        }
    }

    return count;
};

export const diasObjetivoSuperado80 = () => {
    const datos = obtenerTodosLosDatos();
    let count = 0;

    for (const fecha in datos) {
        if (obtenerPuntosDelDia(fecha) >= 80) {
            count++;
        }
    }

    return count;
};

export const puntuacionMedia = () => {
    const datos = obtenerTodosLosDatos();
    let totalPuntos = 0;
    let diasContabilizados = 0;

    for (const fecha in datos) {
        const puntosDelDia = obtenerPuntosDelDia(fecha);
        const esDiaCompletado = !datos[fecha].includes(0); // No hay ningún producto con 0 puntos

        if (esDiaCompletado && puntosDelDia > 0) {
            totalPuntos += puntosDelDia;
            diasContabilizados++;
        }
    }

    return diasContabilizados ? (totalPuntos / diasContabilizados).toFixed(2) : 0;  // Redondeo a 2 decimales
};


