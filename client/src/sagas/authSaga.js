import {  call, put, take, cancelled, cancel, fork  } from 'redux-saga/effects'
import axios from 'axios'
import * as types from '../actions/authActionsTypes'
import * as actions from 'actions/authActions'

function* authorize(user, password) {
  try {
    const resp = yield call(axios.post,'http://localhost:3001/users/authenticate',{username:user,password:password})
    const token = resp.data
    yield put(actions.loginSuccess(token))
    return token
  } catch(error) {
    error = error.response.data.message
    yield put({type: 'LOGIN_FAILURE', error})
  } finally{
    if (yield cancelled()) {
      /// acá iría cualquier lógica que vuelva a la app a su estado sin
      //sesión activa
    }
  }
}

function* loginFlow() {
  while(true){
    const {user, password} = yield take(types.LOGIN_REQUEST)
    const task = yield fork(authorize, user, password)
    const action = yield take([types.USER_LOGOUT, types.LOGIN_FAILURE])
    if (action.type === types.USER_LOGOUT){
      yield cancel(task)
    }
    // yield call(Api.clearItem, 'token')
  }
}

export const authSaga =  {
  loginFlow
};
