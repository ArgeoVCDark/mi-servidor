//*********************************************
// 1. IMPORTACION DE LIBRERIAS
//*********************************************
//express
//path: sirve para trabajar con archivos y rutas
//mysql2/promise: permite conectar el servidor con mysql
//helmet: ayuda a configurar varias cabeceras de HTTP de segurad en tu app de express
//express-rate-limit: ayuda a delimitar cuantas solicitudes puede hacer el cliente en determinado tiempo
//bcrypt: se utiliza principalmente para hashing de contrasena
//dotenv.config: cargo dotenv y ejecuto la funcion config para cargar la variables del archivo
//creamos el puerto:
const express = require(`express`);
const path = require(`path`);
const mysql = require(`mysql2/promise`);
const helmet = require(`helmet`);
const rateLimit = require(`express-rate-limit`);
const bcrypt = require(`bcrypt`);
require(`dotenv`).config;
const PORT = process.env.PORT || 3000;

//*********************************************
// 2. CONFIGURACION DEL POOL DE mysql
//*********************************************

const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    waitForConnections: true,
    connectionLimit: 10
});
//*********************************************
// 3. MIDDLEWARE DE SESEGURA (VAN PRIMERO)
//*********************************************
app.use(helmet()); //escudo de cabeceras HTTP
const limitador = ratelimit({
    windowMs: 15 * 60 * 1000, //15 minutos
    max: 50, //maximo 50 peticiones por IP
    mesage: "Demasiadas peticiones desde esta IP, Intente mas tarde"
});
//*********************************************
// 4. MIDDLEWARE DE ENTRADA DE DATOS
//*********************************************
app.use(express.static(path.join(`public`)));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//*********************************************
// 5. RUTAS DEL SISTEMA
//*********************************************

//ruta de la pagina de inicio
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

//bloque corazon: nueva cita
app.post("/api/nueva-cita", (req, res) => {
    //validacion de datos antes de tocar la base de dato
    try {
        const { nombre, telefono, emai, servicio, falla } = req.body;
      if(!nombre || !telefono || !email || !servicio || !falla){
        return req.status(400).json({
          ok: false,
          mensaje: 'Dtos invalidos o incompletos'
        });
      }
    } catch (error) {}
    //insercion parametrizada
    //cachar errores
});

//*********************************************
// 6. MANEJO DE ERRORES Y CIERRE SIEMPRA VAN AL FINAL
//*********************************************

//paginas no encontradas

//paracaidas para errores internos 500

//motor del servidor
