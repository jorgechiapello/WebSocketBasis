import React, { Component } from 'react'
import { connect } from 'react-redux'
import Message from './Message'

class MessagesList extends Component {
  render() {
    return (
      <div>
      {this.props.messages.map( (elem) => (
        <Message key={elem.id} message={elem} />
      ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  let index = state.messages.chatSelected
  return {
    messages: state.messages.chatList[index]['messages'],
    index: state.messages.chatSelected
  }
}

export default connect(mapStateToProps,{})(MessagesList)
