import chatReducer from './chatReducer'
const initialState  = {
  isFetching: true,
  chatSelected:null,
  chatList:[],
  chatsCache:[],
  sendMessage:''
}

const chatPanelReducer = (state = initialState,action) => {
  var emptyChatCache,emptyChatList,chatSelectedContent,chatListElement
  switch (action.type) {
    //Agregar los chats recibidos por el fetch inicial
    case 'CHAT_LIST_RECEIVED':
    return Object.assign({},state,{ chatList:action.chats })

    case 'CHANGE_CHAT_SELECTED':
    return Object.assign({}, state, { chatSelected:(action.chatSelected?action.chatSelected._id:null) })

    case 'PUSH_CHAT_RECEIVED':
    return Object.assign({},state,{ chatsCache:[].concat(action.chat,state.chatsCache) })

    ///agrega al listado de chats un elemento nuevo
    case 'PUSH_CHAT_LIST_ELEMENT':
    emptyChatList = state.chatList.filter( (elem)=>(elem._id !== action.chat._id) )
    console.log(action.chat);
    return Object.assign({},state,{ chatList: [].concat({_id:action.chat._id,name:action.chat.name,messages:action.chat.messages},emptyChatList) })

    ///Agrega en la cache un mensaje
    case 'PUSH_MESSAGE':
    let oldChat =  state.chatsCache.find( (elem)=>(elem._id === action.chatSelected) )
    let newChat = chatReducer( oldChat,action )
    ///cache de chats sin el nuevo chat
    emptyChatCache = state.chatsCache.filter( (elem) => (elem._id !== action.chatSelected) )///chatCahe without the chat
    //listado de chats sin el chat actualizado
    emptyChatList = state.chatList.filter( (elem)=>(elem._id !== action.chatSelected) )
    //guarda el chat donde se agregó el último mensaje
    chatSelectedContent = state.chatList.find( (elem)=>(elem._id === action.chatSelected) )
    console.log(action, newChat)
    return Object.assign({}, state,{chatsCache:emptyChatCache.concat(newChat),
      chatList:[].concat({_id:chatSelectedContent._id,name:chatSelectedContent.name, messages:newChat.messages},emptyChatList)
    } )

    ///agrega al listado de chats un elemento nuevo
    case 'PUT_CHAT_ON_TOP_LIST':
    emptyChatList = state.chatList.filter( (elem)=>(elem._id !== action.chatId) )
    chatListElement = state.chatList.find( (elem)=>(elem._id === action.chatId) )
    return Object.assign({},state,{ chatList: [].concat(chatListElement,emptyChatList) })

    default:
    return state
  }
}

export default chatPanelReducer
