import React, { Component } from 'react'
import { BrowserRouter,Route } from 'react-router-dom'
import './App.css'
import MainPanel from './components/MainPanel'
import  {PrivateRoute}  from './components/Auth/PrivateRoute'
import  LoginPage  from './components/Auth/LoginPage'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <BrowserRouter>
        <div>
          <Route path="/login" component={LoginPage}/>
          <PrivateRoute exact path="/" component={MainPanel} loggedIn={this.props.isLoggedIn} />
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn:state.authentication.loggedIn
})

export default connect(mapStateToProps) (App)
