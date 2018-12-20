import React, { Component } from 'react';
import io from 'socket.io-client';
import Sidebar from "./Sidebar";
import MessagesList from "./MessagesList";
import { Provider } from 'react-redux'
import store from '../stores/chatStore'
import { addMessage } from '../actions'


class Recepcionist extends Component {
  constructor(props) {
    super(props)
    const socketChat = io('http://localhost:3001/chat')
    this.state = {
      socket: socketChat,
    }
  }
  render() {
    // console.log(store.getState())
    setTimeout(function () {
      console.log('time out');
      store.dispatch(addMessage('Learn about actions','Jorge','chat1'))
      store.dispatch(addMessage('Aiuuuuda','Jorge','chat2'))
    }, 3000);

    // console.log(store.getState())

    return (
      <Provider store={store}>
        <div className="Recepcionist">
            <Sidebar/>
            <section id="main">
              <MessagesList />
            </section>
        </div>
      </Provider>
    );
  }

}

export default Recepcionist;
