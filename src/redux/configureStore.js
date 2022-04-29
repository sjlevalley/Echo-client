import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import uiReducer from './ui/uiSlice'

const reducer = combineReducers({
    auth: authReducer,
    ui: uiReducer
})

const store = configureStore({
    reducer,
})

export default store