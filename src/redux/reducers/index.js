'use strict'

import {combineReducers} from 'redux'
import user from './userReducer'
import UI from './uiReducer'

const rootReducer = combineReducers({
    user, UI
});

export default rootReducer;