import React, { Component } from 'react'
import { Provider } from 'react-redux'

import Sidebar from "./Sidebar"
import MessagesList from "./MessagesList"
import NewMessage from "./NewMessage"
import chatStoreFunction from 'stores/AppStore'
import { fetchChatList } from 'actions/chatActions'

const store = chatStoreFunction


class ChatPanel extends Component {
  render() {
    store.dispatch(fetchChatList())
    return (
      <Provider store={store}>
        <div className="ChatPanel">
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

export default ChatPanel;
