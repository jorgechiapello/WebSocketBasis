import React, { Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import './App.css';
import MainPanel from './components/MainPanel';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={MainPanel}/>
      </BrowserRouter>
    );
  }
}

export default App;
