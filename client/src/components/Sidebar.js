import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats:this.props.chats
    }
  }
  render() {
    var chatList = this.props.chats;
    var chatTopics = Object.keys(chatList);
    console.log(Object.keys(chatList));
    return (
      <aside id="sidebar" className="sidebar">
        <ul>
          {chatTopics.map(elem=>(
            <li key={elem}>{elem}</li>
          )
        )}
      </ul>
    </aside>
  )
}
}

export default Sidebar;
