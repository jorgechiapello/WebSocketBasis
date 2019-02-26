import {  call, put, take, cancelled, cancel, fork  } from 'redux-saga/effects'

import * as types from '../actions/authActionsTypes'
import * as actions from 'actions/authActions'

import { userService } from '../services/userService';

function* authorize(user, password) {
  try {
    const token = yield call(userService.login, user, password)
    yield put(actions.loginSuccess(token))
    // yield call(Api.storeItem, {token})
    return token
  } catch(error) {
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
      localStorage.removeItem('user');
      yield cancel(task)
    }
    // yield call(Api.clearItem, 'token')
  }
}

export const authSaga =  {
  loginFlow
};
