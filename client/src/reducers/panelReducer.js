import chatReducer from './chatReducer'
const initialState  = {
  isFetching: true,
  chatSelected:null,
  chatList:[],
  chatsCache:[],
  sendMessage:''
}

const panelReducer = (state = initialState,action) => {
  switch (action.type) {

    case 'CHATS_RECEIVED':
    return Object.assign({},state,{ chatList:action.chats })

    case 'CHANGE_CHAT_SELECTED':
    return Object.assign({}, state, { chatSelected: action.chatSelected.id })

    case 'CHAT_RECEIVED':
    let chatReceived = state.chatsCache.concat(action.chat)
    return Object.assign({},state,{chatsCache:chatReceived})

    case 'PUSH_MESSAGE':
    let oldChat =  state.chatsCache.find( (elem)=>(elem.id === action.chatSelected) )
    let newChat = chatReducer( oldChat,action )
    let emptyChatCache = state.chatsCache.filter( (elem) => (elem.id !== action.chatSelected) )///chatCahe without the chat
    return Object.assign({}, state,{chatsCache:emptyChatCache.concat(newChat)} )

    default:
    return state
  }
}

export default panelReducer
