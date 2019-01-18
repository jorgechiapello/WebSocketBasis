import React, { Component } from 'react';
import { Provider } from 'react-redux'

import Sidebar from "./Sidebar";
import MessagesList from "./MessagesList";
import NewMessage from "./NewMessage";
import storeFunction from '../stores/chatStore'
import { fetchChatList } from '../actions'

// import { fetchChats, newChatReceived, addMessage, messageReceived } from '../actions'

const store = storeFunction


class Recepcionist extends Component {
  render() {
    store.dispatch(fetchChatList())
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
