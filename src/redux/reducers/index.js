'use strict'
import { combineReducers } from 'redux';
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import user from './userReducer'
import UI from './uiReducer'

export default history =>
    combineReducers({
        router: connectRouter(history),
        user: user,
        UI: UI,
        form: formReducer
    });
