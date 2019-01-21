import * as types from './chatActionTypes'

export const fetchChatList = () => ({
  type: types.FETCH_CHAT_LIST,
})

export const chatListReceived = (chats) => ({
  type: types.CHAT_LIST_RECEIVED,
  chats,
})

export const fetchChatIfNeeded = (chatId) => ({
  type: types.FETCH_CHAT_IF_NEED,
  chatId,
})

export const chatReceived = (chat) => ({
  type: types.CHAT_RECEIVED,
  chat,
})

export const pushChatReceived = (chat) => ({
  type: types.PUSH_CHAT_RECEIVED,
  chat,
})
/// agrega un chat al listado de chats
export const pushChatListElement = (chat) => ({
  type: types.PUSH_CHAT_LIST_ELEMENT,
  chat,
})
///cambia el chat selecciona para mostrar en pantalla
export const changeChatSelected = (chatSelected) => ({
  type: types.CHANGE_CHAT_SELECTED,
  chatSelected,
})

export const putChatOnTopList = (chatId) => ({
  type: types.PUT_CHAT_ON_TOP_LIST,
  chatId
})

///accion para agregar un mensaje a un chat
export const pushMessage = (chatSelected, message, name) => ({
  type: types.PUSH_MESSAGE,
  chatSelected,
  message,
  name
})

//// Accion cuando se agrega un mensajes desde el cliente
export const addMessage = (message, name) => ({
  type: types.ADD_MESSAGE,
  message,
  name
})

// Accion cuando se recibe un mensaje del servidor
// si no está el chat en cache, lo busca sino agrega nomás
export const messageReceived = (chatSelected,message,name) => ({
  type: types.MESSAGE_RECEIVED,
  chatSelected,
  message,
  name
})
