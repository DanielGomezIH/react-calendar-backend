const express = require( 'express' );
const cors = require( 'cors' );
const { dbConnection } = require( './database/config' );
require( 'dotenv' ).config();

//* 1 Crear el server de express

const app = express();

//* 2 Base de datos

dbConnection();

//* 3 CORS

app.use( cors() );

//* 4 Directorio Público

//? Middleware: Es una función que se ejecuta en el momento en el que alguien hace una petición a mi servidor.

app.use( express.static( 'public' ) );

//* 5 Lectura y parse del body

app.use( express.json() );

//* 6 Rutas

app.use( '/api/auth', require( './routes/auth' ) );

//TODO:  CRUD: Eventos

//* 7 Escuchar peticiones

app.listen( process.env.PORT, () => { console.log( `Server running in port: ${ process.env.PORT }` ); } );