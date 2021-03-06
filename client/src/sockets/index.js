import io from 'socket.io-client';
import { messageReceived } from  'actions/chatActions'

const setupSocket = (dispatch) => {
  const socketChat = io('http://localhost:3001/chat', { query: {rol: 'Recepcionist'} } )

  socketChat.on('consultChat',(data)=>{
    dispatch(messageReceived(data.chatId,data.message,data.name))
  })
  return socketChat
}

export default setupSocket
