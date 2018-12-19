import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Sidebar from "./Sidebar";
import MessagesList from "./MessagesList";

class Receptionist extends Component {
  constructor(props) {
    super(props)
    const socketChat = io('http://localhost:3001/chat')
    this.state = {
      socket: socketChat,
      chats:[]
    }
    axios.defaults.baseUrl = process.env.REACT_APP_API_URL;
    axios.get('api/chats')
    .then(res => {
      this.setState({chats:res.data})
    })
  }
  render() {
    return (
      <div className="App">
        <Sidebar chats={this.state.chats} />
        <section id="main">
          <MessagesList />
        </section>
      </div>
    )
  }
}

export default Receptionist;
