import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import { loginRequest } from '../../actions/authActions';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  alert:{
    padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    border:'1px solid transparent',
    color:'#a94442',
    backgroundColor:'#f2dede',
    borderColor:'#ebccd1',
    borderRadius:'4px',
    boxShadow:'0px 0px'
  },
  tittle:{
    marginBottom:theme.spacing.unit * 1
  }
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
    };
    this.handleChange = this.handleChange.bind(this);
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
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
      <Paper className={classes.paper}>
        <Typography className={classes.tittle} component="h1" variant="h5">
          Sign in
        </Typography>
        {this.props.auth.error ?
        <Paper className={classes.alert}>
        {this.props.auth.error && typeof(this.props.auth.error)=="string"? this.props.auth.error : "Error en el servidor" }
        </Paper>
        : ""}
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange}/>
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={this.props.auth.submitted}
            onClick={(e)=>this.props.handleSubmit(e,this)}
          >
            Sign in
          </Button>
          {this.props.auth.submitted &&
           <img alt="Cargando spinner" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
         }
        </form>
      </Paper>
      </main>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (e,loginPageComponent) => {
    e.preventDefault()
    loginPageComponent.setState({ submitted: true });
    const { email, password } = loginPageComponent.state;
    if (email && password) {
        dispatch(loginRequest(email, password));
    }
  }
})
const mapStateToProps = state => {
  return {
    auth: state.authentication,
  }
}
export default withStyles (styles) (connect (mapStateToProps,mapDispatchToProps) (LoginPage))
