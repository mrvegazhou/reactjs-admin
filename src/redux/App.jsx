import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from "connected-react-router";

import Login from "@/redux/components/auth/Login";
import Error404 from "@/redux/components/error/404";
import LayoutComponent from "@/redux/components/layout";
import AuthRouter from "@/redux/routes/privateRoute";
import connectRoute from "@/redux/routes/connectRoute";
import { history } from "@/redux/store";

const LoginWrapper = connectRoute(Login);
const Error404Wrapper = connectRoute(Error404);

class App extends Component {
    render() {
        return (
            //使用ConnectedRouter包裹路由，并且将 store 中创建的history对象引入，作为 props 传入应用
            <ConnectedRouter history={history}>
                <Switch>
                    <Route component={LoginWrapper} path='/login' />
                    <AuthRouter path='/layout' component={LayoutComponent} key="/layout" ></AuthRouter>
                    <Route component={Error404Wrapper} />
                </Switch>
            </ConnectedRouter>
        );
    }
}

export default connect()(App);