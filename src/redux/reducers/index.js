import { combineReducers } from "redux";

import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import user from './user';

export default history =>  combineReducers({
    auth: user,
    router: connectRouter(history),
    form: formReducer
});
