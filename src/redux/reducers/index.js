import { combineReducers } from "redux";

import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import user from './user';
import tableList from './tableList';
export default history =>  combineReducers({
    auth: user,
    list: tableList,
    router: connectRouter(history),
    form: formReducer
});
