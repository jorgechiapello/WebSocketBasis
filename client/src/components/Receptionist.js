import React, { Component } from 'react';
import { Provider } from 'react-redux'

import Sidebar from "./Sidebar";
import MessagesList from "./MessagesList";
import NewMessage from "./NewMessage";
import storeFunction from '../stores/chatStore'
import { fetchChatList, messageReceived } from '../actions'

// import { fetchChats, newChatReceived, addMessage, messageReceived } from '../actions'

const store = storeFunction


class Recepcionist extends Component {
  render() {
    store.dispatch(fetchChatList())
    // setTimeout(function () {
    //   store.dispatch(chatReceived(
    //     {
    //       id:5,
    //       name:'chat5',
    //       unRead:false,
    //       messages:[
    //         {
    //           id:1,
    //           unRead:false,
    //           message:'una consultita',
    //           handle:'Fulano'
    //         }
    //       ],
    //     }
    //   ))
    // }, 1000);
    setTimeout(function () {
      // store.dispatch(addMessage('y otro más','Jorge'))
      // store.dispatch(messageReceived(5,'mensaje recibido','Fulano de tal'))
    }, 2000);
    setTimeout(function () {
      store.dispatch(messageReceived(213123,'mensaje recibido','Fulano de tal'))
    }, 3000);
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
