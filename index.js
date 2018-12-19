var express = require('express')
var middleware = require('./server/Middleware')
var app = express()
var socket = require('./server/Socket')
var routerAPI = require('./server/RouterAPI')
var cors = require('cors')

///App Setup
var server = app.listen(3001, (err, req, res, next)=>{
  if (err) throw err
  console.log('Está escuchando en el puerto 3001');
})

app.use(cors(),express.static('public'))

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
