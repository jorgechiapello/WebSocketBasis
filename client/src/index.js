import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import dotenv from 'dotenv';
import { configureFakeBackend } from './helpers/fake-backend';
dotenv.config();

// setup fake backend
configureFakeBackend();


ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
