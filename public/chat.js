/// Hacer conexión
var socket = io.connect('http://localhost:3000');

//Query DOM
var message = document.getElementById('message')
    handle = document.getElementById('handle')
    btn = document.getElementById('send')
    output = document.getElementById('output')
    feedback = document.getElementById('feedback')

///Evento
btn.addEventListener('click',(event)=>{
  /// emite un evento llamado chat y un objeto
  socket.emit('chat',{
    message:message.value,
    handle:handle.value
  })
})

message.addEventListener('keypress',()=>{
  socket.emit('typing',handle.value)
})
///Escucha eventos
socket.on('chat',(data)=>{
  feedback.innerHTML = '';
  output.innerHTML += `<p><strong>${data.handle}:</strong>${data.message}</p>`
})

socket.on('typing',(data)=>{
  feedback.innerHTML = `<p><em>${data} está escribiendo... </p>`
})

socket.on('setup',(data)=>{
  console.log(data);
})
