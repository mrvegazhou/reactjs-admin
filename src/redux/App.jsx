import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from "connected-react-router";
import Login from "@/redux/components/auth/Login";
import Error404 from "@/redux/components/error/404";
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
                    <Route component={Error404} />
                </Switch>
            </ConnectedRouter>
        );
    }
}

export default connect()(App);