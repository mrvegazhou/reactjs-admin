import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from "connected-react-router";
import Login from "@/redux/components/auth/Login";
import LayoutComponent from "@/redux/components/layout";
import PrivateRoute from "@/redux/routes/privateRoute";
import { history } from "@/redux/store";

class App extends Component {
    render() {
        const isSignedIn = true;
        return (
            <ConnectedRouter history={history}>
                <Switch>
                    <Route component={Login} exact path='/login' />
                    <PrivateRoute path='/' component={LayoutComponent} authenticate={isSignedIn} key='/layout' />
                </Switch>
            </ConnectedRouter>
        );
    }
}

export default connect()(App);