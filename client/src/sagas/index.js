import { all } from 'redux-saga/effects'
import {chatsSaga} from './chatsSaga'

export default function* rootSaga(params) {
  yield all([
    chatsSaga.fetchChatList(),
    chatsSaga.fetchChatIfNeeded(),
    chatsSaga.chatReceived(),
    chatsSaga.addMessage(params.socket),
    chatsSaga.messageReceived(),
  ])
}
