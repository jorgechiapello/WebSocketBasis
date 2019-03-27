var express = require('express')
var middleware = require('./server/Middleware')
var app = express()
var socket = require('./server/Socket')
var routerAPI = require('./server/RouterAPI')
var cors = require('cors')
var authHandler = require('./server/AuthHandler')
var bodyParser = require('body-parser');
///App Setup
var server = app.listen(3001, (err, req, res, next)=>{
  if (err) throw err
  console.log('Está escuchando en el puerto 3001');
})

app.use(cors(),express.static('public'))

///App Middleware
app.use(middleware.requestTime,middleware.myLogger)

app.post('/users/authenticate',bodyParser.json(),authHandler.authenticate)
app.use('/api',middleware.checkJWT, routerAPI.init(express));


//en caso de que el Token sea inválido, devuelve un 403
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(403).send({message:'Token Inválido'})
  }
})

app.use(function(req, res, next) {
  res.status(404).send('Página no encontrada.');
})

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Error en el servidor.')
})

//Inicia el ServerSocket
var io = socket.init(server)
