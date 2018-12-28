import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeChatSelected, fetchChatIfNeeded } from '../actions'

class Sidebar extends Component {
  render() {
    return (
      <div>
      {this.props.chatList.map((elem)=>
        ( <li key={elem.id} onClick={this.props.handleClick(elem)}>{elem.name}</li> )
      )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {chatList: state.panel.chatList.map( (elem)=>( { name:elem.name, id:elem.id} ) )}
}

const mapDispatchToProps = dispatch => ({
  handleClick: (chatSelected) => (e) => {
    dispatch( fetchChatIfNeeded(chatSelected.id) )
    dispatch( changeChatSelected(chatSelected) )
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar)
