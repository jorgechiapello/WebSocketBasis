var history = require('./ChatHistory')
let ChatModel = require('./model/chatModel')

exports.init =  function (server) {
  var socket  = require ('socket.io')
  var io = socket(server)

  var connectedPublicUsers = {}
  var connectedRecepcionist = {}

  var chat = io
  .of('chat')
  .on('connection', (socket) => {

    var chatId, name = ""

    if (socket.handshake.query.rol === 'PublicUser') {
      chatId = socket.handshake.query.chatId
      name = socket.handshake.query.name
      console.log('Publico conectado')
      console.log(chatId);
      //Si el chatId es distonto de null, ya hizo una consulta antes
      if (chatId != null) {
        (async (chatId)=>{
          let query
          try {
            ///busca el chat
            query  = ChatModel.findById(chatId, (err,chat)=>{
              if (err) {console.error(err)}
            })
            chatConsult = await query.exec()
            if (chatConsult != null) {///Envía el chat encontrado
              chat.to(socket.id).emit('setup', {id: chatId, name: chatConsult.name, messages:chatConsult.messages})
              connectedPublicUsers[chatId] = socket
            }else {///si no lo encuentra, setea el chatId en null
              chat.to(socket.id).emit('setup', {id: null, name:name})
            }
          } catch (e) {
            chat.to(socket.id).emit('setup', {id: null, name:name})
          }
        })(chatId)
      }
    }

    if (socket.handshake.query.rol === 'Recepcionist') {
      connectedRecepcionist[socket.id] = socket
      socket.join('RecepcionistUsers');
    }

    socket.on('consult', (data)=>{
      console.log('entra: '+ data.chatId)
      var mensaje = {
        id:1,
        unRead:true,
        message:data.message,
        name:data.name,
        date:Date.now()
      }
      if (data.chatId == null) {
        var nombreChat = 'Chat'
        var res = ChatModel.find().exec(function (err, results) {
          if (err) {console.error(err)}
          console.log(nombreChat += (results.length + 1))
        });

        var newChat = new ChatModel({ name:nombreChat,unRead:true,messages:[mensaje],date:Date.now()})

        newChat.save()
        data.chatId = newChat._id
        data.date = newChat.date

        chat.to(socket.id).emit('setup', {id: data.chatId, name: data.name})
        console.log("data.chatId",  data.chatId);
      } else {
        console.log('update', data.chatId)
        let res1 = ChatModel.findOneAndUpdate({_id:data.chatId},
          {
            $push: {
              messages:mensaje
            }
          },
          {},
          function (error,chat) {
            console.log(error);
            console.log(chat);
          })
        }
        connectedPublicUsers[chatId] = socket

        chat.to('RecepcionistUsers').emit('consultChat',data);
        chat.to(socket.id).emit('message', data);
      })

      socket.on('reply', (data)=>{
        data.name = 'Ministerio de Justicia'
        socket.to(connectedPublicUsers[data.to]['id']).emit('message', data )
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
