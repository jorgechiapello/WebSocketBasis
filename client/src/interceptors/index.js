import axios from 'axios'
import { tokenFailure } from  'actions/authActions'

///Cuando hay un usuario guardado en la localStorage, utiliza el token almacenado para agregar a todas las requests
const setToken = () => (axios.interceptors.request.use(function(config) {
  if ( JSON.parse(localStorage.getItem("user")) != null ) {
    const token = JSON.parse(localStorage.getItem("user")).token
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function(err) {
  return Promise.reject(err);
}))

// Agrega un interceptor al AXIOS para los 403: no autorizado
const interceptor401 = (dispatch) => {axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (403 === error.response.status) {
      dispatch(tokenFailure(error.response.data.message))
    } else {
        return Promise.reject(error);
    }
})}

export {setToken,interceptor401}
