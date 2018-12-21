import React, { Component } from 'react';
import io from 'socket.io-client';
import Sidebar from "./Sidebar";
import MessagesList from "./MessagesList";
import NewMessage from "./NewMessage";
import { Provider } from 'react-redux'
import storeFunction from '../stores/chatStore'
import { fetchChats } from '../actions'

const store = storeFunction()

class Recepcionist extends Component {
  constructor(props) {
    super(props)
    const socketChat = io('http://localhost:3001/chat')
    this.state = {
      socket: socketChat,
    }
  }
  render() {
    store.dispatch(fetchChats())
    return (
      <Provider store={store}>
        <div className="Recepcionist">
            <Sidebar/>
            <section id="main">
              <MessagesList />
              <NewMessage />
            </section>
        </div>
      </Provider>
    );
  }
}

export default Recepcionist;
