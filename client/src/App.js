import React, { Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import './App.css';
import ChatPanel from './components/ChatPanel';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={ChatPanel}/>
      </BrowserRouter>
    );
  }
}

export default App;
