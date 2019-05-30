import { createStore, compose, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger'
import apiMiddleware from "./middlewares/api";
const loggerMiddleware = createLogger()

import reducers from "./reducers";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducers(history), //dispatch history给connectRouter
    composeEnhancers(
        applyMiddleware(
            apiMiddleware,
            thunk,
            loggerMiddleware,
            routerMiddleware(history)
        )
    )
);