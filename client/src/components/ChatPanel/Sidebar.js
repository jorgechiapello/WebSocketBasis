import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PersonIcon from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'

import { changeChatSelected, fetchChatIfNeeded } from 'actions/chatActions'

const styles = theme => ({
  root: {
    width: '550px',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    borderRadius:theme.shape.borderRadius
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  inline: {
    display: 'inline',
  },
})

class Sidebar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.props.chatList.map((elem,index)=>
          (<List
            component="nav"
            className={classes.root}
            onClick={this.props.handleClick(elem)}
            key={elem._id}
            >
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={elem.name}
                secondary={
                  <React.Fragment>
                    <Typography component="span" className={classes.inline} color="textPrimary">
                      {elem.lastMessage ? elem.lastMessage.name :"Error"}
                    </Typography>
                    {" — " +  (elem.lastMessage.message ?elem.lastMessage.message: "Error")}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>)
          )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {chatList: state.panel.chatList.map( (elem)=>( {
    name:elem.name, _id:elem._id, lastMessage:elem.lastMessage}
  ) )}
}

const mapDispatchToProps = dispatch => ({
  handleClick: (chatSelected) => (e) => {
    dispatch( fetchChatIfNeeded(chatSelected._id) )
    dispatch( changeChatSelected(chatSelected) )
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles, { withTheme: true })(Sidebar))
