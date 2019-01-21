import React, { Component } from 'react';

class Message extends Component {

  render( ) {
    return (
    <p>
      <i>{this.props.message.name}</i>: {this.props.message.message}
    </p>
    )
  }
}

export default Message;
