import * as types from './actionTypes'

export const fetchChats = () => (
  (dispatch) => (
    fetch('http://localhost:3001/api/chats')
    .then(
      response => response.json(),
      error => console.log('Error: ', error)
    )
    .then(json =>{
      dispatch(chatsReceived(json))
      dispatch(changeChatSelected(json[0]))
      dispatch(fetchChatIfNeeded(json[0]['id']))
    })
  )
)

export const chatsReceived = (chats) => ({
  type: types.CHATS_RECEIVED,
  chats,
})

export const chatReceived = (chat) => ({
  type: types.CHAT_RECEIVED,
  chat,
})

export const fetchChatIfNeeded = (chatId) => (
  (dispatch, getState) => {
    let isInCache = getState().panel.chatsCache.find((elem) => (elem.id === chatId))
    if (!isInCache) {
      return dispatch(fetchChat(chatId))
    }
  }
)

export const fetchChat = (chatId) => (
  (dispatch) => (
    fetch('http://localhost:3001/api/chats/'+chatId)
    .then(
      response => response.json(),
      error => console.log('Error: ', error)
    )
    .then(json =>{
      dispatch(chatReceived(json))
    })
  )
)

export const changeChatSelected = (chatSelected) => ({
  type: types.CHANGE_CHAT_SELECTED,
  chatSelected,
})


export const pushMessage = (chatSelected, message, handle) => ({
  type: types.PUSH_MESSAGE,
  chatSelected,
  message,
  handle
})

export const addMessage = (chatSelected, message, handle) => (
  (dispatch)=>(
    dispatch(pushMessage(chatSelected, message, handle))
  )
)

export const messageReceived = () => (
  (dispatch) => (
    222
  )
)
