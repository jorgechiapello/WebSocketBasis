import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({

})
class Message extends Component {
  render( ) {
    const { classes } = this.props;
    return (
    <p className={classes.chatPanel}>
      <i>{this.props.message.name}</i>:{this.props.message.message}
    </p>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Message)
