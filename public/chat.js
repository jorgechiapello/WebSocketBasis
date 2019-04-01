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
  /// emite un evento llamado chat y un objeto
  if (message.value != '') {
    chat.emit('consult',{
      message:message.value,
      name:document.getElementById('name').value,
      chatId:chatId
    })
  }
  message.value = null
})

message.addEventListener('keypress',()=>{
  chat.emit('typing',name.value)
})
function printDate(fecha) {
  let fechaAux = new Date(fecha);
  diasSemana = ['Dom.','Lun.','Mar.','Mié.','Jue.','Vie.','Sáb.']
  meses = ['Enero','Febrero', 'Marzo', 'Abril','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  let frase = '<li class="fecha"> <p>'+ diasSemana[fechaAux.getDay()] +' '+ fechaAux.getDate() + ' de '+ meses[fechaAux.getMonth()] + ' '+ fechaAux.getFullYear() +'</p> </li>'
  output.innerHTML += frase
}
function printMessage(data) {
  let fecha = new Date(data.date)
  // console.log(data);
  output.innerHTML += `
  <li>
  <p class="${data.userRol}"><strong><i>${data.name}</i>: </strong>
  ${data.message}
  <br />
  <small>${fecha.getHours()}:${fecha.getMinutes()}</small></p>
  </li>`
}
///Escucha eventos
chat.on('message',(data)=>{
  // console.log('Mensaje recibido: ',data);
  feedback.innerHTML = ''
  printMessage(data)
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
  var currentDate = new Date(data.messages[0].date)
  printDate(currentDate)
  data.messages.map(function (message) {
    if(currentDate.getDate()!== new Date(message.date).getDate()) {
      printDate(message.date)
      currentDate = new Date(message.date)
    }
    printMessage(message)
  })
})
