import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import Sidebar from "./Sidebar"
import MessagesList from "./MessagesList"
import NewMessage from "./NewMessage"
import chatStoreFunction from 'stores/AppStore'
import { fetchChatList } from 'actions/chatActions'

const store = chatStoreFunction
const styles = theme => ({
  chatPanel:{
    display: 'flex',

  },
  content:{
    border: "red solid 2px",
    width: "100%",
    heigth:"100%",
    padding: "20px",
    borderRadius:theme.shape.borderRadius
  }
})

class ChatPanel extends Component {
  render() {
    const { classes } = this.props;
    store.dispatch(fetchChatList())
    return (
      <Provider store={store}>
        <div className={classes.chatPanel}>
          <Sidebar/>
          <div className={classes.content}>
            <MessagesList />
            <NewMessage />
          </div>
        </div>
      </Provider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ChatPanel)
