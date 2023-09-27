import React from 'react';
import './Tutorial.css';

const Tutorial = () => {
    return (
        <div className="tutorial-container">
            <h1>Cómo jugar a Preciosisimo</h1>
            <p><strong>Preciosisimo</strong>  es un juego dinámico y divertido que pone a prueba tu capacidad para estimar el coste de diferentes productos. A continuación, te guiaremos paso a paso para que te conviertas en un experto.</p>

            <h2>Paso 1: Observa el producto</h2>
            <p>Al iniciar el juego, se te presentará una imagen del producto que debes evaluar. Tómate un momento para examinarla detenidamente. Si sientes que necesitas más información, no te preocupes. Simplemente haz clic en "Descripción +", y se desplegará una descripción detallada del producto para darte más pistas.</p>
            <img src="/images/tutorial/tutorial1.png" alt="Producto con la opción Descripción +" className="tutorial-image"/>

            <h2>Paso 2: Establece tu estimación</h2>
            <p>&iquest;Tienes una cifra en mente? &iexcl;Genial! Para introducir tu estimaci&oacute;n, tienes dos opciones:</p>
            <ol>
                <li><strong>Barra deslizante:</strong> Esta barra te permite seleccionar un precio arrastrando su indicador. Adem&aacute;s, es completamente t&aacute;ctil en dispositivos m&oacute;viles, lo que facilita su uso en smartphones y tablets.</li>
                <li><strong>Teclado num&eacute;rico:</strong> Si prefieres una cifra exacta, sit&uacute;a el cursor sobre el espacio a la derecha de la barra deslizante y utiliza tu teclado para introducir el precio.</li>
            </ol>
            <img src="/images/tutorial/tutorial2.png" alt="Barra deslizante y espacio para introducir el precio" className="tutorial-image"/>

            <h2>Paso 3: ¡Comprueba tu respuesta!</h2>
            <p>Una vez que estés satisfecho con tu estimación, haz clic en el botón "Comprobar". El juego revelará el precio real del producto en la barra deslizante. En función de cuán cercana estuvo tu estimación del precio real, recibirás puntos. ¡Puedes obtener hasta 20 puntos si aciertas exactamente o te aproximas mucho!</p>

            <h2>¡Desafíate a ti mismo!</h2>
            <p>¿Buscas un reto mayor? Tu objetivo es acumular la máxima puntuación posible. Hay dos logros a los que aspirar: superar los 50 y los 80 puntos. Cada vez que juegues, tus estadísticas se actualizarán, permitiéndote seguir tu progreso y mejoras.</p>
            <img src="/images/tutorial/tutorial4.png" alt="Estadísticas del jugador" className="tutorial-image"/>

            <h2>Juega diariamente</h2>
            <p>Aseg&uacute;rate de revisar <strong>Preciosisimo</strong> todos los d&iacute;as. A las 00:00 horas UTC, se publican 5 nuevos productos para que los eval&uacute;es. Y si te perdiste alg&uacute;n d&iacute;a, puedes volver atr&aacute;s utilizando el calendario. Los d&iacute;as se colorean seg&uacute;n tu progreso:</p>
            <ul>
                <li><strong>Rojo:</strong> D&iacute;as en los que ya has jugado.</li>
                <li><strong>Naranja:</strong> D&iacute;as en los que comenzaste pero a&uacute;n quedan productos por adivinar.</li>
                <li><strong>Verde:</strong> D&iacute;as que a&uacute;n no has jugado.</li>
            </ul>
            <img src="/images/tutorial/tutorial3.png" alt="Calendario con los diferentes colores" className="tutorial-image"/>

            <p>¡Eso es todo! Ahora estás listo para jugar y poner a prueba tus habilidades en <strong>Preciosisimo</strong>. ¡Disfruta y suerte en tus estimaciones!</p>
        </div>
    );
};

export default Tutorial;
