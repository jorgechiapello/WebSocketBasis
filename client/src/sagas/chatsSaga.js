import {  call, takeEvery, takeLatest, put, select, take, fork  } from 'redux-saga/effects'
import axios from 'axios'

import * as types from 'actions/chatActionTypes'
import * as actions from 'actions/chatActions'

///Getters Básicos
const isInCache = (state,chatId) => ( state.panel.chatsCache.find((elem) => (elem._id === chatId)) !== undefined )
const isInList = (state,chatId) => ( state.panel.chatList.find((elem) => (elem._id === chatId)) !== undefined )
const getChatSelected = state => state.panel.chatSelected

function* fetchChatList() {
  try {
    yield takeLatest(types.FETCH_CHAT_LIST, function* (action) {
      var chats = yield call(axios.get,'http://localhost:3001/api/chats')
      chats= chats.data
      yield put( actions.chatListReceived(chats) )
      if (chats[0]!==undefined) {
        yield put( actions.changeChatSelected(chats[0]) )
        yield put( actions.fetchChatIfNeeded(chats[0]['_id']) )
      }
    })
  } catch (e) {
    console.error("Error en fetchChatList",e);
  }
}
function* fetchChat(chatId, tries = 2) {
  try {
    var resp = yield (call(axios.get,'http://localhost:3001/api/chats/'+chatId))
    let chat = resp.data
    yield put( actions.chatReceived(chat) )
  } catch (e) {
    tries > 0 ? yield (fork(fetchChat,chatId,tries-1)) : console.log('Error al recuperar chat');
  }
}

function* fetchChatIfNeeded() {
  while(true){
    const action = yield take(types.FETCH_CHAT_IF_NEED)
    try {
      if ( ! (yield select(isInCache,action.chatId ))  ) {
        yield (fork(fetchChat,action.chatId))
      }
    } catch (e) {
      console.error("Error en fetchChatIfNeeded",e);
    }
  }
}

function* chatReceived() {
  yield takeEvery(types.CHAT_RECEIVED, function* (action) {
    if (!(yield select(isInCache,action.chat._id)) ) {
      yield put( actions.pushChatReceived(action.chat) )
    }
    if (!(yield select(isInList,action.chat._id)) ) {
      yield put( actions.pushChatListElement(action.chat) )
    }
  })
}

function* addMessage(socket) {
  yield takeEvery(types.ADD_MESSAGE, function* (action) {
    var chatSelected = yield select (getChatSelected)
    yield put( actions.pushMessage(chatSelected,{name:'Ministerio',message:action.message,replyMessage:true},action.name))
    socket.emit('reply',{
      chatId: chatSelected,
      message: action.message,
      name: action.name
    })
  })
}

function* messageReceived() {
  yield takeEvery(types.MESSAGE_RECEIVED, function* (action) {
    if ((yield select(isInCache,action.chatSelected)) ) {
      yield put( actions.pushMessage(action.chatSelected,action.message,action.name))
    }else {
      yield put( actions.fetchChatIfNeeded(action.chatSelected) )
    }
    if ( (yield select(isInList,action.chatSelected)) ) {
      yield put( actions.putChatOnTopList(action.chatSelected) )
    }
  })
}

export const chatsSaga =  {
  fetchChatList,
  fetchChatIfNeeded,
  chatReceived,
  addMessage,
  messageReceived,
};
