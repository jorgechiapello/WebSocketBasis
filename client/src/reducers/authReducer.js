let user = JSON.parse(localStorage.getItem('user'));
const initialState = {
  loggedIn: false,
  user:null,
  submitted: false,
  loading: false,
  error:  null
};
if (user) {
  initialState.user = user
  initialState.loggedIn = true
}else {
  initialState.loggedIn = false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return Object.assign({}, state,{ loggedIn: true, user: action.user, error:'' } )
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state,{ loggedIn: true, user: action.user, error:'' } )
    case 'LOGIN_FAILURE':
      return Object.assign({}, state,{ error:action.error } )
    case 'USER_LOGOUT':
      localStorage.removeItem('user');
      return { loggedIn: false };
    default:
      return state
  }
}
export default authReducer
