import React, { Component } from 'react'
import { ChatContext } from '../contexts/ChatContext';
import Message from './Message'

class MessagesList extends Component {
  render() {
    var messages = []
    if (this.context.state.chats) {
      let chat = this.context.state.chats[this.context.state.chatSelected]
      if (chat) {
        messages = chat.messages
      }
    }
    return (
      <ChatContext.Consumer>
      {(context) => (
        <div>
          {messages.map( elem => (
            <Message key={elem.id} message={elem}>
            </Message>
          ))}
        </div>
      )}
      </ChatContext.Consumer>
    )
  }
}
MessagesList.contextType = ChatContext

export default MessagesList
