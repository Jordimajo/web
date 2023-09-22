// 1. Modificación de obtenerNombreArchivo
const obtenerNombreArchivo = (fecha = new Date()) => {
    const mes = fecha.getMonth();
    const year = fecha.getFullYear();

    const nombresMeses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    return `productos_${year}_${nombresMeses[mes]}.json`;
};

// 2. Función para obtener productos de un día específico basado en clave
const obtenerProductosDelDia = (data, fecha = new Date()) => {
    const dia = fecha.getDate();
    const clave = `dia_${dia}`;

    return data[clave] || []; // Busca los productos por la clave. Si no los encuentra, devuelve un array vacío.
};

// 3. Modificación de cargarProductosDelMes
const cargarProductosDelDia = async (fecha = new Date()) => {
    const nombreArchivo = obtenerNombreArchivo(fecha);

    try {
        const data = await import(`../data/${nombreArchivo}`);
        return obtenerProductosDelDia(data.default, fecha);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        return [];
    }
};

const obtenerFechaDesdeAPI = async () => {
    try {
        const response = await fetch("http://worldtimeapi.org/api/timezone/Etc/UTC");
        const data = await response.json();

        if (data && data.utc_datetime) {
            const fechaAPI = new Date(data.utc_datetime);
            return {
                year: fechaAPI.getUTCFullYear(),
                month: fechaAPI.getUTCMonth(),
                day: fechaAPI.getUTCDate()
            };
        }
    } catch (error) {
        console.error("Error al obtener la fecha UTC desde la API:", error);
    }
    return null;
};

const getUTCDate = async () => {
    const fechaDesdeAPI = await obtenerFechaDesdeAPI();

    if (fechaDesdeAPI) {
        return fechaDesdeAPI;
    } else {
        const now = new Date();
        const year = now.getUTCFullYear();
        const month = now.getUTCMonth();
        const day = now.getUTCDate();

        return { year, month, day };
    }
};

export { cargarProductosDelDia, getUTCDate };
