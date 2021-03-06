import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { addMessage } from 'actions/chatActions'

const styles = theme => ({
  newMessage:{
    backgroundColor:theme.palette.primary.light,
    width:"100%",
    padding: "4px",
    minHeight: "45px",
    maxHeight: "100px",
    overflowY:"auto"
  },
  textInput:{
    float: "left",
    border: "none",
    width: "calc(100% - 72px)",
    padding: "0px 10px 4px 8px",
    fontSize: "0.8em",
    color: "#32465a",
    backgroundColor:"white",
    borderBottom:"none"
  },
  sendBtn:{
    marginLeft:"5px",
  }
})

class NewMessage extends Component {
  constructor(props) {
    super(props);
    this.textInputRef = React.createRef();
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.newMessage}>
        <TextField name="text" id="newMessageText"
          multiline
          rowsMax="4"
          className={classes.textInput}
          InputProps={{
            disableUnderline: true,
            inputRef:this.textInputRef
          }}
        />
        <Button variant="contained" color="primary" className={classes.sendBtn} onClick={this.props.handleClick(this.props.chatSelected,this.textInputRef)}>
          <SendIcon />
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleClick: (chatSelected,textInputRef) => (e) => {
    dispatch(addMessage(textInputRef.current.value,'Ministerio'))
  }
})

const mapStateToProps = state => {
  return {
    chatSelected: state.panel.chatSelected
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles, { withTheme: true })(NewMessage))
