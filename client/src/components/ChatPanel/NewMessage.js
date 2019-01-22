import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addMessage } from 'actions/chatActions'

class NewMessage extends Component {
  constructor(props) {
    super(props);
    this.textInputRef = React.createRef();
  }
  render() {
    return (
      <div>
        <textarea type="textarea" name="text" id="newMessageText" ref={this.textInputRef}/>
        <button onClick={this.props.handleClick(this.props.chatSelected,this.textInputRef)}>Submit</button>
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


export default connect(mapStateToProps,mapDispatchToProps)(NewMessage)
