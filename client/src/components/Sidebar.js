import React, { Component } from 'react';
import { ChatContext } from '../contexts/ChatContext';

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.handleClick.bind(this)
  }
  handleClick = (elem,context) => (e) => {
    e.preventDefault()
    // context.state.chatSelected = elem
    context.changeSelected(elem)
  }
  render() {
    var chatTopics = []
    if (this.context.state.chats) {
      chatTopics = Object.keys(this.context.state.chats)
    }
    return (
      <ChatContext.Consumer>
      {(context) => (
        <React.Fragment>
        {chatTopics.map(elem=>(
          <li key={elem} onClick={this.handleClick(elem,context)} value={elem}>{elem}</li>
        ))}
        </React.Fragment>
      )}
      </ChatContext.Consumer>
    )
  }
}

Sidebar.contextType = ChatContext;

export default Sidebar;
