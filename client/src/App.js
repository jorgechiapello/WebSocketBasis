import React, { Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
// import uuid from 'uuid';
import './App.css';
import Receptionist from './components/Receptionist';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Receptionist}/>
      </BrowserRouter>
    );
  }
}

export default App;
