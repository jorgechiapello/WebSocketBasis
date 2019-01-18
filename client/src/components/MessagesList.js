import React, { Component } from 'react'
import { connect } from 'react-redux'
import Message from './Message'

class MessagesList extends Component {
  render() {
    var messages = []
    var aux =  this.props.chat.find( (elem)=>(elem._id === this.props.chatSelected) )
    if (aux) {
      messages = aux.messages
    }
    return (
      <div>
      {messages.map( (elem,index) => (
        <Message key={index} message={elem} />
      ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    chat: state.panel.chatsCache,
    chatSelected: state.panel.chatSelected
  }
}

export default connect(mapStateToProps,{})(MessagesList)
