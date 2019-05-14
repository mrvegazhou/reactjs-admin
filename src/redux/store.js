import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

const loggerMiddleware = createLogger()
const store = createStore(
    reducers,
    applyMiddleware(thunk, loggerMiddleware)
)
export default store