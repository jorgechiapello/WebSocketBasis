import chatReducer from './chatReducer'
const initialState  = {
  isFetching: true,
  chatSelected:null,
  chatList:[],
  chatsCache:[],
  sendMessage:''
}

const panelReducer = (state = initialState,action) => {
  var emptyChatCache,emptyChatList
  switch (action.type) {
    case 'CHATS_RECEIVED':
    return Object.assign({},state,{ chatList:action.chats })

    case 'CHANGE_CHAT_SELECTED':
    return Object.assign({}, state, { chatSelected: action.chatSelected.id })

    case 'PUSH_CHAT_RECEIVED':
    return Object.assign({},state,{chatsCache:[].concat(action.chat,state.chatsCache) })

    case 'PUSH_CHAT_LIST_ELEMENT':
    emptyChatList = state.chatList.filter( (elem)=>(elem.id !== action.chat.id) )
    return Object.assign({},state,{chatList: [].concat({id:action.chat.id,name:action.chat.name},emptyChatList)})

    case 'PUSH_MESSAGE':
    let oldChat =  state.chatsCache.find( (elem)=>(elem.id === action.chatSelected) )
    let newChat = chatReducer( oldChat,action )
    emptyChatCache = state.chatsCache.filter( (elem) => (elem.id !== action.chatSelected) )///chatCahe without the chat
    return Object.assign({}, state,{chatsCache:emptyChatCache.concat(newChat)} )

    default:
    return state
  }
}

export default panelReducer
