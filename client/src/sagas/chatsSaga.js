import {  call, takeEvery, takeLatest, all, put, select, take  } from 'redux-saga/effects'
import axios from 'axios'

import * as types from '../actions/actionTypes'
import * as actions from '../actions'

///Getters Básicos
const isInCache = (state,chatId) => ( state.panel.chatsCache.find((elem) => (elem._id === chatId)) !== undefined )
const isInList = (state,chatId) => ( state.panel.chatList.find((elem) => (elem._id === chatId)) !== undefined )
const getChatSelected = state => state.panel.chatSelected

function* fetchChatList() {
  yield takeLatest(types.FETCH_CHAT_LIST, function* (action) {
    var chats = yield call(axios.get,'http://localhost:3001/api/chats')
    chats= chats.data
    yield put( actions.chatListReceived(chats) )
    yield put( actions.changeChatSelected(chats[0]) )
    yield put( actions.fetchChatIfNeeded(chats[0]['_id']) )
  })
}

function* fetchChatIfNeeded() {
  while(true){
    const action = yield take(types.FETCH_CHAT_IF_NEED)
    if ( ! (yield select(isInCache,action.chatId ))  ) {
      var chat = yield call(axios.get,'http://localhost:3001/api/chats/'+action.chatId)
      chat = chat.data
      yield put( actions.chatReceived(chat) )
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
  console.log(socket);
  yield takeEvery(types.ADD_MESSAGE, function* (action) {
    var chatSelected = yield select (getChatSelected)
    yield put( actions.pushMessage(chatSelected,action.message,action.handle))
    socket.emit('reply',{
      to: chatSelected,
      message: action.message,
      name: action.handle
    })
  })
}

function* messageReceived() {
  yield takeEvery(types.MESSAGE_RECEIVED, function* (action) {
    if ((yield select(isInCache,action.chatSelected)) ) {
      yield put( actions.pushMessage(action.chatSelected,action.message,action.handle))
    }else {
      yield put( actions.fetchChatIfNeeded(action.chatSelected) )
    }
    if ( (yield select(isInList,action.chatSelected)) ) {
      yield put( actions.putChatOnTopList(action.chatSelected) )
    }
  })
}

export default function* rootSaga(params) {
  yield all([
    fetchChatList(),
    fetchChatIfNeeded(),
    chatReceived(),
    addMessage(params.socket),
    messageReceived()
  ])
}
