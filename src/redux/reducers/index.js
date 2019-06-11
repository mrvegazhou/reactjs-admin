import { combineReducers } from "redux";

import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import user from './user';
import tableList from './tableList';
import { handleBreadCrumb, handleAccessMenu, handleMenuCollapsed, handleTabOpenPages } from './common';
import calendar from './calendar';
export default history =>  combineReducers({
    auth: user,
    calendar: calendar,
    breadCrumb: handleBreadCrumb,
    menuCollapse: handleMenuCollapsed,
    tabOpenPages: handleTabOpenPages,
    accessMenu: handleAccessMenu,
    list: tableList,
    router: connectRouter(history),
    form: formReducer
});
