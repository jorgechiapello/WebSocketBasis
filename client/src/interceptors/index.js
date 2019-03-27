import axios from 'axios'
import { tokenFailure } from  'actions/authActions'

const setToken = () => (axios.interceptors.request.use(function(config) {
  const token = JSON.parse(localStorage.getItem("user")).token
  if ( token != null ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function(err) {
  return Promise.reject(err);
}))

// Add a 401 response interceptor
const interceptor401 = (dispatch) => {axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
      dispatch(tokenFailure("Session Expired"))
    } else {
        return Promise.reject(error);
    }
})}

export {setToken,interceptor401}
