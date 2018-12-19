import React, { Component } from 'react';
import axios from 'axios';
import { ChatContext } from '../contexts/ChatContext';

class ChatsProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chatSelected: 'chat1',
      chats:[]
    }
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    axios.get('/chats')
    .then(res => {
      this.setState({chats:res.data})
    })
    this.changeSelected = this.changeSelected.bind(this)
  }

  changeSelected(chat){
    console.log(this);
    this.setState(state => ({chatSelected:chat}))
  }
  render() {
    return (
      <ChatContext.Provider value={{
        state: this.state,
        changeSelected:this.changeSelected
      }}>
        {this.props.children}
      </ChatContext.Provider>
    )
  }
}

export default ChatsProvider;
