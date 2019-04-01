import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import Message from './Message'

const styles = theme => ({
  content:{
    backgroundColor:"rgb(255, 255, 255)",
    overflowY: "auto",
    borderRadius:theme.shape.borderRadius,
    height: "calc(100% - 45px)",
  },
  messages:{
    minHeight: "calc(100% - 93px)",
    overflowY: "auto",
  },
  ulStyle:{
    listStyle: "none",
  },
  dateBubble: {
    clear: "both",
    width: "100%",
    margin: "0px 15px 0px 0px",
    display: "inline-block",
    fontSize: "0.9em",
    textAlign:"center",
  },
  datePrint:{
    width: "150px",
    background: "gray",
    marginLeft:"auto",
    marginRight:"auto",
    margin: "1px 0px",
    display: "inline-block",
    padding: "5px 15px",
    maxWidth: "205px",
    lineHeight: "130%",
    borderRadius: "20px",
    color: "white",
  }
})

class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.ChatMessages = React.createRef();
  }
  componentDidUpdate() {
    this.ChatMessages.current.scrollIntoView({block:"end" });
  }
  printDate(dateAux,dateMessage){
    const diasSemana = ['Dom.','Lun.','Mar.','Mié.','Jue.','Vie.','Sáb.']
    const meses = ['Enero','Febrero', 'Marzo', 'Abril','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

    return `${diasSemana[dateAux.getDay()]} ${dateAux.getDate()} de ${meses[dateAux.getMonth()]} ${dateAux.getFullYear()}`
  }
  compareDates(date1,date2){
    let date1Aux = new Date(date1)
    let date2Aux = new Date(date2)
    return date1Aux.getDate() != date2Aux.getDate() || date1Aux.getMonth() != date2Aux.getMonth()
  }
  render() {
    const { classes } = this.props;

    var messages = []
    var aux =  this.props.chat.find( (elem)=>(elem._id === this.props.chatSelected) )
    if (aux) {
      messages = aux.messages
      var dateAux = new Date(messages[0].date)
      console.log(new Date(dateAux))
    }
    var dateMessage;
    return (
      <div className={classes.content}>
        <div className={classes.messages} ref={this.ChatMessages}>
          <ul className={classes.ulStyle}>
          { dateAux ? <li key={dateAux.date} className={classes.dateBubble}>
          <p className={classes.datePrint}> {this.printDate(dateAux)}</p>
          </li>:null}

          {messages.map( (elem,index) => (
            <React.Fragment key={index}>
            { (messages[index - 1 ] ? this.compareDates(messages[index - 1].date, messages[index].date): false)
              ? <li key={elem.date} className={classes.dateBubble}>
              <p className={classes.datePrint}> {this.printDate(new Date(elem.date))}</p>
              </li>
              : null }
            <Message key={index} message={elem} />
            </React.Fragment>
          ))}

          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    chat: state.panel.chatsCache,
    chatSelected: state.panel.chatSelected
  }
}

export default connect(mapStateToProps,{})( withStyles(styles, { withTheme: true })(MessagesList))
