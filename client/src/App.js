import React, { Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux'
import MainPanel from './components/MainPanel';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import  LoginPage  from './components/Auth/LoginPage'
import authStoreFunction from 'stores/AuthStore'

const authStore = authStoreFunction

class App extends Component {
  render() {
    console.log(authStore);
    return (
      <Provider store={authStore}>
      <BrowserRouter>
        <div>
          <Route path="/login" component={LoginPage}/>
        </div>
      </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
