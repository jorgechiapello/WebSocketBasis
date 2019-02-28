import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component,loggedIn:isLoggedIn, ...rest }) => (
    <Route {...rest} render={props => (
        isLoggedIn
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
