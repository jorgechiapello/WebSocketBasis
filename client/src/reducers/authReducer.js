let user = JSON.parse(localStorage.getItem('user'));
const initialState = {
  loggedIn: false,
  user:null,
  submitted: false,
  loading: false,
  error:'Mensaje de error 1'
};
if (user) {
  initialState.user = user
  initialState.loggedIn = true
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return Object.assign({}, state,{ submitted:true } )
    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.user))
      return Object.assign({}, state,{ loggedIn: true, user: action.user, submitted:false } )
    case 'LOGIN_FAILURE':
      return Object.assign({}, state,{ user:null, submitted:false, error:action.error } )
    case 'TOKEN_FAILURE':
      localStorage.removeItem('user');
      return Object.assign({}, state,{ loggedIn: false,user:null, submitted:false, error:action.error } )
    case 'USER_LOGOUT':
      localStorage.removeItem('user');
      return Object.assign({}, state,{ loggedIn: false, user:null } )
    default:
      return state
  }
}
export default authReducer
