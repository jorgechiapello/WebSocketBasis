import * as types from './actionTypes'

export const addMessage = (message, handle, chat) => ({
  type: types.ADD_MESSAGE,
  chat,
  message,
  handle
})

export const messageReceived = (message, handle, chat) => ({
  type: types.MESSAGE_RECEIVED,
  chat,
  message,
  handle
})

export const changeChatSelected = (chatSelected) => ({
  type: types.CHANGE_CHAT_SELECTED,
  chatSelected,
})

export const addChat = (chat) => ({
  type: types.ADD_CHAT,
  chat,
})
