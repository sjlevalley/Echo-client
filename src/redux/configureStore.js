import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import broadcastsReducer from './broadcasts/broadcastsSlice'
import uiReducer from './ui/uiSlice'

const reducer = combineReducers({
  user: userReducer,
  broadcasts: broadcastsReducer,
  ui: uiReducer
})

const store = configureStore({
  reducer
})

export default store
