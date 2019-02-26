import React, { Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux'
import MainPanel from './components/MainPanel';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import  LoginPage  from './components/Auth/LoginPage'
import storeFunction from 'stores/AppStore'

const store = storeFunction

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
        <div>
          <PrivateRoute exact path="/" component={MainPanel}   />
          <Route path="/login" component={LoginPage}/>
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
