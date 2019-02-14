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
    store.dispatch(fetchChatList())
    return (
      <Provider store={store}>
        <div className={classes.root}>
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
