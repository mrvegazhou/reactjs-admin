import React from "react";
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import LayoutComponent from "@/views/layout";

const RouteConfig = (
        <Switch>
            <Route path="/" component={LayoutComponent} />
        </Switch>
);

export default RouteConfig;