import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  received:{
    background: "#3f51b5",
    color: "#f5f5f5",
  },
  sent:{
    background: "#435f7a",
    float: "right",
    color: "white",
    textAlign: "right",
  },
  message:{
    display: "inline-block",
    clear: "both",
    float: "left",
    margin: "0px 15px 0px 0px",
    width: "calc(100% - 25px)",
    fontSize: "0.9em",
  },
  text:{
    display: "inline-block",
    padding: "10px 15px",
    borderRadius: "20px",
    maxWidth: "70%",
    lineHeight: "130%",
    margin: "1px 0px",
  },
  name: {
    color: "#c6c8e6",
  },
  hora:{
    color:"#d5d5d5",
  }
})
class Message extends Component {
  render( ) {
    const { classes,message } = this.props;
    let fecha = new Date(message.date)
    return (
    <li className={classes.message} >
      <p className={[message.replyMessage? classes.sent: classes.received,classes.text].join(' ')}>
        <strong className={classes.name}><i>{message.name}</i></strong>: {message.message}
        <br/>
        <small className={[classes.hora, message.replyMessage? classes.sent: classes.received]}>{fecha.getHours()}:{fecha.getMinutes()}</small>
      </p>
    </li>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Message)
