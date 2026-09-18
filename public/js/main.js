// public/js/apiService.js

/**
 * Servicio encargado exclusivamente de la comunicación por red con el Servidor Backend.
 * Sigue el principio de responsabilidad única.
 */

// Centralizamos las URLs de nuestra API para que si cambian en el futuro, solo edites una línea
const API_BASE_URL = '/api'; 

/**
 * Envía una solicitud de nueva cita al backend de Express.
 * @param {Object} datosCita - Objeto con nombre, telefono, servicio y descripcion.
 * @returns {Promise<Object>} Respuesta procesada del servidor.
 */
export async function enviarPeticionNuevaCita(datosCita) {
    const url = `${API_BASE_URL}/nueva-cita`;

    const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(datosCita) // Envía el JSON limpio por la red
    });

    /* 
       [BUENA PRÁCTICA]: Retornamos tanto el estatus de éxito como el JSON解析.
       Dejamos que la capa superior (formulario.js) decida qué alertas o interfaz mostrar.
    */
    const resultado = await respuesta.json();
    
    return {
        ok: respuesta.ok,
        status: respuesta.status,
        datos: resultado
    };
}
