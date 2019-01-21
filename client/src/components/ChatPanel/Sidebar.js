import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeChatSelected, fetchChatIfNeeded } from 'actions/chatActions'

class Sidebar extends Component {
  render() {
    return (
      <div>
      {this.props.chatList.map((elem,index)=>
        ( <li key={elem._id} onClick={this.props.handleClick(elem)}>{elem.name}</li> )
      )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {chatList: state.panel.chatList.map( (elem)=>( { name:elem.name, _id:elem._id} ) )}
}

const mapDispatchToProps = dispatch => ({
  handleClick: (chatSelected) => (e) => {
    dispatch( fetchChatIfNeeded(chatSelected._id) )
    dispatch( changeChatSelected(chatSelected) )
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar)
