import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  received:{
    background: "#435f7a",
    color: "#f5f5f5",
  },
  sent:{
    background: "#f5f5f5",
    float: "right",
  },
  message:{
    display: "inline-block",
    clear: "both",
    float: "left",
    margin: "0px 15px 5px 0px",
    width: "calc(100% - 25px)",
    fontSize: "0.9em",
  },
  text:{
    display: "inline-block",
    padding: "10px 15px",
    borderRadius: "20px",
    maxWidth: "205px",
    lineHeight: "130%",
    margin: "4px 0px",
  }
})
class Message extends Component {
  render( ) {
    const { classes,message } = this.props;
    return (
    <li className={classes.message} >
      <p className={[message.replyMessage? classes.sent: classes.received,classes.text].join(' ')}>
        <i>{message.name}</i>: {message.message}
      </p>
    </li>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Message)
