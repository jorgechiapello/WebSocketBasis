import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import dotenv from 'dotenv';
import { configureFakeBackend } from './helpers/fake-backend';
import storeFunction from 'stores/AppStore'
dotenv.config();
const store = storeFunction

// setup fake backend
configureFakeBackend();


ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
serviceWorker.unregister();
