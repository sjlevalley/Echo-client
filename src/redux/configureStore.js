import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import uiReducer from './ui/uiSlice'

const reducer = combineReducers({
  user: userReducer,
  ui: uiReducer
})

const store = configureStore({
  reducer
})

export default store
