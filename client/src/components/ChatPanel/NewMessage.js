import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addMessage } from 'actions/chatActions'
import { FormGroup, Label, Input, Container, Row, Col, Button } from 'reactstrap';

class NewMessage extends Component {
  constructor(props) {
    super(props);
    this.textInputRef = React.createRef();
  }
  render() {
    return (
      <div>
      <Container>
        <Row>
          <Col md={{ size:8, offset:1 }}>
          <FormGroup>
          <Label for="newMessageText">Text Area</Label>
          <Input type="textarea" name="text" id="newMessageText" innerRef={this.textInputRef}/>
          </FormGroup>
          </Col>
        </Row>
        <Button onClick={this.props.handleClick(this.props.chatSelected,this.textInputRef)}>Submit</Button>
      </Container>
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
