import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import Message from './Message'

const styles = theme => ({
  content:{
    backgroundColor:"rgb(255, 255, 255)",
    padding: "0.5em",
    height: "80%",
    overflowY: "auto",
    borderRadius:theme.shape.borderRadius,
  }
})

class MessagesList extends Component {
  render() {
    const { classes } = this.props;

    var messages = []
    var aux =  this.props.chat.find( (elem)=>(elem._id === this.props.chatSelected) )
    if (aux) {
      messages = aux.messages
    }
    return (
      <div className={classes.content}>
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

export default connect(mapStateToProps,{})( withStyles(styles, { withTheme: true })(MessagesList))
