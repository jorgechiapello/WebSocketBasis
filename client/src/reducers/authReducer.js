let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : { loggedIn: false};
initialState.error =  ''

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        loggingIn: true,
        user: action.user
      };
    case 'LOGIN_SUCCESS':
      return {
        loggedIn: true,
        user: action.user
      };
    case 'LOGIN_FAILURE':
    return Object.assign({}, state,{ error:action.error } )
    case 'USER_LOGOUT':
      return { loggedIn: false };
    default:
      return state
  }
}
export default authReducer
