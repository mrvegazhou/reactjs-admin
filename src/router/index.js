import React from "react";
import { browserHistory, HashRouter as Router, Route, Switch} from 'react-router-dom'
import LayoutComponent from "@/views/layout";

const RouteConfig = (
    <Router history={browserHistory}>
        <Switch>
            <Route path="/" component={LayoutComponent} />
        </Switch>
    </Router>
);

export default RouteConfig;