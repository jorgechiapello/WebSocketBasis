import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {setToken, interceptor401} from './interceptors'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import dotenv from 'dotenv';
import { configureFakeBackend } from './helpers/fake-backend';
import storeFunction from 'stores/AppStore'
dotenv.config();
const store = storeFunction

setToken()
//este interceptor necesita el dispatch para enviar el evento
interceptor401(store.dispatch)
// setup fake backend
configureFakeBackend();

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
serviceWorker.unregister();
