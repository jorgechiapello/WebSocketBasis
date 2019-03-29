//Query DOM
var message = document.getElementById('message')
    btn = document.getElementById('send')
    output = document.getElementById('output')
    feedback = document.getElementById('feedback')
    name = document.getElementById('name').value

    userData = JSON.parse(localStorage.getItem('userData'))
    chatId = userData ? userData.id : null
    console.log(chatId)

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
  message.value = null
})

message.addEventListener('keypress',()=>{
  chat.emit('typing',name.value)
})

function escribir(data) {
  console.log(data);
  output.innerHTML += `<li><p class="${data.userRol}"><strong>${data.name}:</strong>${data.message}</p></li>`
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
  chatId = data.id
  chat.query.id = data.id
  localStorage.setItem('userData',JSON.stringify(data))
  document.getElementById('name').value = data.name
  output.innerHTML = ""
  data.messages.map(function (message) {
    console.log(message);
    escribir(message)
  })
})
