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
      console.log('Publico conectado')

      chatId = socket.handshake.query.chatId
      name = socket.handshake.query.name
      //Si el chatId es distonto de null, ya hizo una consulta antes
      //desde el cliente recibe un String con el contenido null
      if (chatId != 'null') {
        (async (chatId)=>{
          let query
          try {
            ///busca el chat
            query  = ChatModel.findById(chatId, (err,chat)=>{
              ///nos interesan los errores que no sean casteo
              if (err) {
                if (err.name != "CastError") {console.error(err.message)}
              }
            })
            chatConsult = await query.exec()
            if (chatConsult != null) {///Envía el chat encontrado
              chat.to(socket.id).emit('setup', {id: chatId, name: chatConsult.client, messages:chatConsult.messages})
              connectedPublicUsers[chatId] = socket
            }else {///si no lo encuentra, setea el chatId en null
              chat.to(socket.id).emit('setup', {id: null, name:name, messages:[]})
            }
          } catch (e) {
            chat.to(socket.id).emit('setup', {id: null, name:name, messages:[]})
          }
        })(chatId)
      }
    }

    if (socket.handshake.query.rol === 'Recepcionist') {
      connectedRecepcionist[socket.id] = socket
      socket.join('RecepcionistUsers')
    }

    socket.on('consult', (data)=>{
      console.log('entra: '+ data.chatId)
      var mensaje = {
        unRead:true,
        message:data.message,
        name:data.name,
        date:Date.now(),
        replyMessage:false
      }
      new Promise ((resolve,reject)=>{
        console.log('promise')
        if (data.chatId == null) {
          var nombreChat = 'Chat'
          ChatModel.find().exec(function (err, results) {
            if (err) {console.error(err)}
            console.log(nombreChat += (results.length + 1))

            var newChat = new ChatModel({
              name:nombreChat,
              unRead:true,
              messages:[mensaje],
              date:Date.now(),
              client:data.name
            })

            newChat.save(function (err,result) {
              data.chatId = result._id
              data.date = result.date
              chat.to(socket.id).emit('setup', {id: data.chatId, name: data.name,messages:[mensaje]})
              resolve(result)
            })
          })

        } else {
          console.log('update', data.chatId)
          ChatModel.findOneAndUpdate({_id:data.chatId},
            {
              client:data.name,
              $push: {
                messages:mensaje
              }
            },
            {},
            function (err,result) {
              if(err){console.error(err)}
              console.log(result)
              chat.to(socket.id).emit('message', data)
              resolve(result)
            })
          }

        }).then(function (result) {
          console.log('envia chat')
          connectedPublicUsers[result._id] = socket

          console.log('result',result._id)

          chat.to('RecepcionistUsers').emit('consultChat',data)
        })

      }
    )

    socket.on('reply', (data)=>{
      data.name = 'Ministerio de Justicia'
      var mensaje = {
        unRead:false,
        message:data.message,
        name:'Ministerio',
        date:Date.now(),
        replyMessage:true
      }
      ChatModel.findOneAndUpdate({_id:data.chatId},
        {
          $push: {
            messages:mensaje
          }
        },
        {},
        function (err,result) {
          if(err) {console.error(err)}
          console.log(result)
          if (result){
            socket.to(connectedPublicUsers[data.chatId]['id']).emit('message', data )
          }
        })
      }
    )

    socket.on('typing',(data)=>{
      socket.broadcast.emit('typing',data)
    })

    socket.on('disconnect', function () {
      console.log('disconnect: '+ socket.id)
      if (socket.handshake.query.rol === 'PublicUser') {
        delete connectedPublicUsers[socket.id]
      }

      if (socket.handshake.query.rol === 'Recepcionist') {
        delete connectedRecepcionist[socket.id]
      }
      chat.emit('user disconnected')
    })

  })
  return io
}
