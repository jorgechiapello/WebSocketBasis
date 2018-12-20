const initialState  = {
  'chatList':{
    'chat1':{
      id:1123,
      messages:[
        {
          id:1,
          message:'Hola',
          handle:'Jorge'
        },{
          id:2,
          message:'Cómo andas?',
          handle:'Fulano'
        }
      ],
    },
    'chat2':{
      id:213123,
      messages:[
        {
          id:1,
          message:'Buenas este es el chat 2?',
          handle:'Jorge'
        },{
          id:2,
          message:'así es',
          handle:'Fulano'
        }
      ],
    },
    'chat3':{
      id:12312333,
      messages:[
        {
          id:1,
          message:'Buenas este es el chat 4?',
          handle:'Jorge'
        },{
          id:2,
          message:'Nop, el chat 4',
          handle:'Fulano'
        }
      ],
    },
  },
  'chatSelected':'chat1',
  'sendMessage':''
}
const messages = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      var newArray = state.chatList[action.chat]['messages'].concat([
        {
          id: state['chatList'][action.chat]['messages'].length + 1,
          message: action.message,
          handle: action.handle,
        }]
      )
      var newObject = Object.assign({}, state)
      newObject.chatList[action.chat]['messages'] = newArray
    return newObject

    case "MESSAGE_RECEIVED":
      var newArray = state.chatList[action.chat]['messages'].concat([
        {
          id: state['chatList'][action.chat]['messages'].length + 1,
          message: action.message,
          handle: action.handle,
        }]
      )
      var newObject = Object.assign({}, state)
      newObject.chatList[action.chat]['messages'] = newArray
    return newObject

    case 'CHANGE_CHAT_SELECTED':
    return Object.assign({}, state, {
        chatSelected: action.chatSelected
      })
    default:
    return state
  }
}

export default messages
