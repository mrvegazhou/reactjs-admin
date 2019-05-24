import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticate, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authenticate ? <Redirect to="/" /> : <Component {...props} />
        }
    />
);

export default PrivateRoute;