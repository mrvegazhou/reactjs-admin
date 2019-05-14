import React from "react";
import {browserHistory, Router, Route, IndexRoute} from "react-router";
import Layout from "../views/layout";

const RouteConfig = (
    <Router history={browserHistory}>
        <Switch>
            <Route path="/read" getComponent={read} />
            <Route path="/" component={Layout} />
        </Switch>
    </Router>
);