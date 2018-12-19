import React, { Component } from 'react';
import io from 'socket.io-client';
import Sidebar from "./Sidebar";
import MessagesList from "./MessagesList";
import ChatsProvider from '../providers/ChatsProvider'


class Recepcionist extends Component {
  constructor(props) {
    super(props)
    const socketChat = io('http://localhost:3001/chat')
    this.state = {
      socket: socketChat,
    }
  }
  render() {
    return (
      <ChatsProvider value={this.state}>
      <div className="Recepcionist">
          <Sidebar/>
          <section id="main">
            <MessagesList />
          </section>
      </div>
      </ChatsProvider>
    );
  }

}

export default Recepcionist;
