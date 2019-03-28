import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {setToken, interceptor401} from './interceptors/axiosInterceptor'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import dotenv from 'dotenv';
import storeFunction from 'stores/AppStore'
dotenv.config();
const store = storeFunction

setToken()
//este interceptor para el Axios necesita el dispatch para enviar el evento
interceptor401(store.dispatch)

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
serviceWorker.unregister();
