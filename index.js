var express = require('express')
var middleware = require('./src/Middleware')
var app = express()
var socket = require('./src/Socket')
var routerAPI = require('./src/RouterAPI')

///App Setup
var server = app.listen(3000, (err, req, res, next)=>{
  if (err) throw err
  console.log('Está escuchando en el puerto 3000');
})

///App Middleware
app.use(middleware.requestTime,middleware.myLogger)

///Static File
app.use('/api', routerAPI.init(express));

app.use(function(req, res, next) {
  res.status(404).send('Página no encontrada.');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error en el servidor.');
});

//Inicia el ServerSocket
var io = socket.init(server)
