import React, { Component } from 'react';

class Message extends Component {

  render( ) {
    console.log(this.props);
    return (
    <p>
      <i>{this.props.message.handle}</i>:{this.props.message.message}
    </p>
    )
  }
}

export default Message;
