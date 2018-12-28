var history = require('./ChatHistory')

exports.init =  function (server) {
  var socket  = require ('socket.io')
  var io = socket(server)

  var connectedPublicUsers = {}
  var connectedRecepcionist = {}

  var chat = io
  .of('chat')
  .on('connection', (socket) => {

    console.log('conexión socket realizada', socket.id, 'tipo: ',socket.handshake.query.rol)
    var chatId, name

    if (socket.handshake.query.rol === 'PublicUser') {
      chatId = socket.handshake.query.chatId
      name = socket.handshake.query.name
      if (chatId !== null) {
        let chatConsult = history.find( (elem)=>(elem.id === chatId) )

        if (chatConsult !== undefined) {
          chat.to(socket.id).emit('setup', {id: chatId, name: chatConsult.name, messages:chatConsult.messages});
          connectedPublicUsers[chatId] = socket
        }else {
          chat.to(socket.id).emit('setup', {id: null, name:null});
        }
      }

      console.log(Object.keys(connectedPublicUsers));
    }

    if (socket.handshake.query.rol === 'Recepcionist') {
      connectedRecepcionist[socket.id] = socket
      socket.join('RecepcionistUsers');
      console.log(Object.keys(connectedRecepcionist));
    }

    socket.on('consult', (data)=>{
      if (data.chatId == null) {
        var chatConsult = history.find( (elem)=>(elem.id === data.chatId) )
        chat.to(socket.id).emit('setup', {id: chatConsult.id,name: chatConsult.name});
      }else {

      }

      data.timestamp = Date.now()
      data.socketId = socket.id
      chat.to('RecepcionistUsers').emit('consultChat',data);
    })

    socket.on('message', (data)=>{
      console.log(connectedPublicUsers[data.to]['id']);
      socket.to(connectedPublicUsers[data.to]['id']).emit('message', data )
      console.log(data);
    })

    socket.on('typing',(data)=>{
      socket.broadcast.emit('typing',data)
    })

    socket.on('disconnect', function () {
      console.log('disconnect: '+ socket.id);
      if (socket.handshake.query.rol === 'PublicUser') {
        delete connectedPublicUsers[socket.id]
      }

      if (socket.handshake.query.rol === 'Recepcionist') {
        delete connectedRecepcionist[socket.id]
      }
      chat.emit('user disconnected');
    });

  })
  return io
}
