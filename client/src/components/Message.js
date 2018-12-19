import React, { Component } from 'react';

class Message extends Component {

  render() {
    return (
    <p>
      <i>{author}</i>: {message}
    </p>
    )
  }
}

export default Message;
