import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
import connectRoute from "@/redux/routes/connectRoute";

class AuthRouter extends Component {
    render() {
        const { component: Component, ...rest } = this.props
        // const isLogged = sessionStorage.getItem("isLogin") === "1" ? true : false;
        const isLogged = true;
        const ComponentWrapper = connectRoute(Component);
        return (
            <Route {...rest} exact render={props => {
                return isLogged
                    ? <ComponentWrapper {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: this.props.location }
                    }} />
            }} />
        )
    }
}

export default withRouter(AuthRouter);
