import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeChatSelected } from '../actions'

class Sidebar extends Component {
  render() {
    return (
      <div>
      {this.props.chatTopics.map((elem)=>
        ( <li key={elem} onClick={this.props.handleClick(elem)}>{elem}</li>)
      )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {chatTopics: Object.keys(state.messages.chatList)}
}

const mapDispatchToProps = dispatch => ({
  handleClick: (elem) => (e) => {
    dispatch(changeChatSelected(elem))
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar)
