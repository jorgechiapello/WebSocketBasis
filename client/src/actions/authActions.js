import * as types from './authActionsTypes'

export const loginRequest = (user) => ({
  type: types.LOGIN_REQUEST,
  user,
})
export const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  user
})
export const loginFailure = (error) => ({
  type: types.LOGIN_FAILURE,
  error
})

export const userLogout = () => ({
  type: types.USER_LOGOUT,
})
