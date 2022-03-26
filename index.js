
const express = require('express');
const path = require('path');
require('dotenv').config();


//DB Config

const { dbConnection } = require('./database/config')
dbConnection();

// App de Express
const app = express();

//Lectura y Parseo del BODY
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );



//Mis Rutas
const userRoute = require("./routes/auth");
app.use("/api/login", userRoute);








server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});

