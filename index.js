const express = require( 'express' );
const cors = require( 'cors' );
const { dbConnection } = require( './database/config' );
const path = require( 'path' );
require( 'dotenv' ).config();

//* 1 Crear el server de express

const app = express();

//* 2 Base de datos

dbConnection();

//* 3 CORS

app.use( cors( {
  origin: 'https://react-calendar-app-sooty.vercel.app',
} ) );


//* 4 Directorio Público

//? Middleware: Es una función que se ejecuta en el momento en el que alguien hace una petición a mi servidor.

app.use( express.static( 'public' ) );

//* 5 Lectura y parse del body

app.use( express.json() );

//* 6 Rutas

app.use( '/api/auth', require( './routes/auth' ) );

app.use( '/api/events', require( './routes/events' ) );

app.use( '*', ( req, resp ) => {
  resp.sendFile( path.join( __dirname, 'public/index.html' ) );
} );

//* 7 Escuchar peticiones

app.listen( process.env.PORT, () => { console.log( `Server running in port: ${ process.env.PORT }` ); } );