import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticate, ...rest }) => {
    return <Route
        {...rest}
        render={props =>
            authenticate ? <Component {...props} /> : <Redirect to="/login" />
        }
    />
};

export default PrivateRoute;