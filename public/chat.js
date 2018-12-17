/// Hacer conexión
var chat = io.connect('http://localhost:3000/chat');

//Query DOM
var message = document.getElementById('message')
    handle = document.getElementById('handle')
    btn = document.getElementById('send')
    output = document.getElementById('output')
    feedback = document.getElementById('feedback')
    rooms = document.getElementById('rooms')

///Evento
btn.addEventListener('click',(event)=>{
  console.log('evento enviar')
  /// emite un evento llamado chat y un objeto
  chat.emit('chat',{
    message:message.value,
    handle:handle.value
  })
})

message.addEventListener('keypress',()=>{
  chat.emit('typing',handle.value)
})

function escribir(data) {
  output.innerHTML += `<p><strong>${data.handle}:</strong>${data.message}</p>`
}
///Escucha eventos
chat.on('chat',(data)=>{
  console.log('recibió');
  feedback.innerHTML = ''
  escribir(data)
})

chat.on('typing',(data)=>{
  feedback.innerHTML = `<p><em>${data} is typing... </p>`
})

rooms.addEventListener('change',()=>{
  chat.emit('changeSetup',selectedRoom)
})
