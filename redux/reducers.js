import { combineReducers } from 'redux'

import auth from './auth'

import { connectRouter } from 'connected-react-router'

const { reducer: authReducer } = auth

const reducers = history =>
    combineReducers({
        auth: authReducer,
        router: connectRouter(history)
    })

export default reducers
