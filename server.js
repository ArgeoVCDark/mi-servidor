/*const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// 1. Middleware para habilitar la carpeta pública de archivos estáticos (CSS, imágenes)
app.use(express.static("public"));

// 2. Middleware para que Express entienda los datos de formularios de texto (POST)
app.use(express.urlencoded({ extended: true }));

// RUTA CENTRAL: Envia la Landing Page al usuario
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// RUTA RECEPTORA: Aquí llega la información del formulario al presionar enviar
app.post("/api/nueva-cita", (req, res) => {
  // req.body guarda todas las variables enviadas por el formulario
  const datosDelCliente = req.body;

  // Imprime en la consola de Termux los datos que el usuario llenó en su pantalla
  console.log("=====================================");
  console.log("¡NUEVA SOLICITUD DE CITA RECIBIDA!");
  console.log("=====================================");
  console.log(`Cliente: ${datosDelCliente.nombre}`);
  console.log(`Teléfono: ${datosDelCliente.telefono}`);
  console.log(`Servicio: ${datosDelCliente.servicio}`);
  console.log(`Falla: ${datosDelCliente.descripcion}`);
  console.log("=====================================");

  // Le responde al navegador una confirmación visual limpia
  res.send(`
        <div style="background-color: #0f172a; color: #f8fafc; font-family: sans-serif; text-align: center; padding-top: 100px; height: 100vh; margin:0;">
            <h1 style="color: #10b981;">¡Solicitud Recibida Correctamente!</h1>
            <p>Gracias ${datosDelCliente.nombre}, un mecánico te llamará pronto al ${datosDelCliente.telefono}.</p>
            <br>
            <a href="/" style="color: #10b981; text-decoration: none; font-weight: bold;">← Regresar al sitio</a>
        </div>
    `);
});

// (Este bloque DEBE ir hasta abajo de todas tus rutas, justo antes del app.listen)

app.get("/{*splat}", (req, res) => {
  // Le avisamos al navegador con un código de estado 404 que la página no existe
  res.status(404).send(`
        <div style="background-color: #0f172a; color: #f8fafc; font-family: sans-serif; text-align: center; padding-top: 100px; height: 100vh; margin:0;">
            <h1 style="color: #ef4444; font-size: 4rem;">404</h1>
            <h2>¡Ups! Página no encontrada</h2>
            <p>La dirección que escribiste no existe en el taller de Mecánica Premium.</p>
            <br>
            <a href="/" style="color: #10b981; text-decoration: none; font-weight: bold;">← Regresar al Inicio Seguro</a>
        </div>
    `);
});

// Enciende el motor del servidor
app.listen(PORT, () => {
  console.log(
    `Servidor de Mecánica Premium activo en http://localhost:${PORT}`,
  );
});
*/

const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
//Middleware
app.use(express.static("public"));
app.use(express.urlencoded(`{exected=true}`));

//escuchamos la peticion de la pagina web
app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, `index.html`));
});

//recibimos datos del formulario que envia ek usuario
app.post(`/api/nueva-cita`, (req, res) => {
    const datosDelCliente = req.body;
    //repondemos al servidor
    console.log(`===========================================`);
    console.log(`Nueva Cita Agenda correctamente`);
    console.log(`Nombre: ${datosDelCliente.nombre}`);
    console.log(`Telefono: ${datosDelCliente.telefono}`);
    console.log(`Servicio: ${datosDelCliente.servicio}`);
    console.log(`Fallla: ${datosDelCliente.falla}`);
    console.log(`===========================================`);

    //respondemos  al usuario
    res.send(`<div><h1>Solicitud Recibida Correctamente</h1>
  <p>Gracias ${datosDelCliente.nombre} un mecanico se pondra en contavto al ${datosDelCliente.telefono}</p><br><a href="/"><--Regresar al Inicio</a></div>`);
});

//escuchamos si colocan una url equivocada
app.get(`/{*splat}`, (req, res) => {
    res.status(404).send(
        `<div><h1>404</h1><p>Tu URL es incorrecta REVISALA</p><br><a href="/"><-- Regresar al Inicio</a></div>`
    );
});

//motro del servidor
app.listen(PORT, () => {
    console.log(
        `Servidor de Mecanica Premiun Activo en http://localhost:${PORT}`
    );
});
