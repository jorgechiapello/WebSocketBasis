//Query DOM
var message = document.getElementById('message')
    btn = document.getElementById('send')
    output = document.getElementById('output')
    feedback = document.getElementById('feedback')
    name = document.getElementById('name').value
    chatId = null

    console.log( 'chatId: ' + chatId);
    console.log( 'name: ' + name);
    /// Hacer conexión
    var chat = io('http://localhost:3001/chat', { query: {rol: 'PublicUser', chatId:chatId, name:name} });

///Eventos emitidos
btn.addEventListener('click',(event)=>{
  console.log({
    message:message.value,
    name:name.value,
    chatId:chatId
  })
  console.log(name)
  /// emite un evento llamado chat y un objeto
  chat.emit('consult',{
    message:message.value,
    name:document.getElementById('name').value,
    chatId:chatId
  })
})

message.addEventListener('keypress',()=>{
  chat.emit('typing',name.value)
})

function escribir(data) {
  output.innerHTML += `<p><strong>${data.name}:</strong>${data.message}</p>`
}
///Escucha eventos
chat.on('message',(data)=>{
  console.log('Mensaje recibido: ',data);
  feedback.innerHTML = ''
  escribir(data)
})

// chat.on('typing',(data)=>{
//   feedback.innerHTML = `<p><em>${data} is typing... </p>`
// })

chat.on('setup',(data)=>{
  console.log('recibió setup',data);
  chatId = data.id
  document.getElementById('name').value = data.name
  output.innerHTML = ""
  data.messages.map(function (message) {
    escribir(message)
  })
})
