var express = require('express')
var socket  = require ('socket.io')
var middleware = require('./src/Middleware')
var app = express()

///App Setup
var server = app.listen(3000, ()=>{
  console.log('Está escuchando en el puerto 3000');
})

///App Middleware
app.use(middleware.requestTime,middleware.myLogger)

///Static File
app.use(express.static('public'))

app.use(function(req, res, next) {
  res.status(404).send('Página no encontrada.');
});
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error en el servidor.');
});

var io = socket(server)

// var mensajes = [['hola','mengano'],['todo bien','fulano']]

io.on('connection', (socket) => {
  console.log('conexión socket realizada', socket.id)

  // io.sockets.emit('setup',data)

  socket.on('chat', (data)=>{
    io.sockets.emit('chat',data)
  })

  socket.on('typing',(data)=>{
    socket.broadcast.emit('typing',data)
  })

})
