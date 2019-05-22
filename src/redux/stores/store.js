import { createStore, applyMiddleware, compose } from 'redux/index'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from '@/redux/reducers'
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

const loggerMiddleware = createLogger()

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducers(history),
    composeEnhancers(
        applyMiddleware(
            apiMiddleware,
            thunk,
            routerMiddleware(history)
        )
    )
);