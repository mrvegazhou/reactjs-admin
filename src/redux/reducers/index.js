import { combineReducers } from "redux";

import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import user from './user';
import tableList from './tableList';
import { handleBreadCrumb } from './common';
export default history =>  combineReducers({
    auth: user,
    breadCrumb: handleBreadCrumb,
    list: tableList,
    router: connectRouter(history),
    form: formReducer
});
