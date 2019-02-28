import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loginRequest } from '../../actions/authActions';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    console.log(props);
    if (props.auth.loggedIn) {
      props.history.push('/')
    }
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  componentDidUpdate(prevProps) {
    if (this.props.auth.loggedIn) {
      this.props.history.push('/')
      console.log(this.props.auth.loggedIn)
    }
  }
  render() {
    const { username, password, submitted, loading, error } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <div className="alert alert-info">
        Username: test<br />
        Password: test
        </div>
      <h2>Login</h2>
      <form name="form" onSubmit={(e)=>this.props.handleSubmit(e,this)}>
        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
          {submitted && !username &&
            <div className="help-block">Username is required</div>
          }
        </div>
        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
          {submitted && !password &&
            <div className="help-block">Password is required</div>
          }
        </div>
        <div className="form-group">
          <button className="btn btn-primary" disabled={loading}>Login</button>
          {loading &&
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          }
        </div>
        {error &&
          <div className={'alert alert-danger'}>error</div>
        }
      </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (e,loginPageComponent) => {
    e.preventDefault()
    loginPageComponent.setState({ submitted: true });
    const { username, password } = loginPageComponent.state;
    if (username && password) {
        dispatch(loginRequest(username, password));
    }
  }
})
const mapStateToProps = state => {
  return {
    auth: state.authentication,
  }
}
export default connect (mapStateToProps,mapDispatchToProps) (LoginPage)
