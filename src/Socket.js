
exports.init =  function (server) {
  var socket  = require ('socket.io')
  var io = socket(server)

  var chat = io
  .of('chat')
  .on('connection', (socket) => {
    console.log('conexión socket realizada', socket.id)

    socket.on('chat', (data)=>{
      data.timestamp = Date.now()
      chat.emit('chat',data)
    })

    socket.on('typing',(data)=>{
      socket.broadcast.emit('typing',data)
    })

    socket.on('disconnect', function () {
      chat.emit('user disconnected');
    });

  })
  return io
}
