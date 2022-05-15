import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import broadcastsReducer from './broadcasts/broadcastsSlice'
import uiReducer from './ui/uiSlice'

const reducer = combineReducers({
  auth: authReducer,
  broadcasts: broadcastsReducer,
  ui: uiReducer
})

const store = configureStore({
  reducer
})

export default store
