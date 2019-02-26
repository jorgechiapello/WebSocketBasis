import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import Sidebar from "./Sidebar"
import MessagesList from "./MessagesList"
import NewMessage from "./NewMessage"
import { fetchChatList } from 'actions/chatActions'

const styles = theme => ({
  root:{
    display: 'flex',
    minHeight: "300px",
    maxHeight: "490px",
    height:"490px",
  },
  content:{
    border: "#c9aaaa solid 2px",
    width: "100%",
    borderRadius:theme.shape.borderRadius,
    minHeight: "300px",
  }
})

class ChatPanel extends Component {
  render() {
    const { classes } = this.props;
    return (
        <div className={classes.root}>
          <Sidebar/>
          <div className={classes.content}>
            <MessagesList />
            <NewMessage />
          </div>
        </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchChatList: dispatch(fetchChatList())
})
export default connect( state => ({}),mapDispatchToProps) (withStyles(styles, { withTheme: true })(ChatPanel))
