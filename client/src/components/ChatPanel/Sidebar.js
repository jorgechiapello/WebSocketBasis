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
    borderRadius:theme.shape.borderRadius,
    overflowY: "scroll",
    backgroundColor:theme.palette.primary.dark,
  },
  navItem:{
    maxWidth: 340,
    backgroundColor:theme.palette.primary.light,
    padding: "0px",
    margin:"5px 5px"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  inline: {
    display: 'inline',
  },
  profileItem:{
    backgroundColor:"white",
    padding:"5px",
    borderRadius: "50%",
  }
})

class Sidebar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.props.chatList.map((elem,index)=>
          (<List
            component="nav"
            className={classes.navItem}
            onClick={this.props.handleClick(elem)}
            key={elem._id}
            >
            <ListItem button>
              <ListItemIcon className={classes.profileItem}>
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
