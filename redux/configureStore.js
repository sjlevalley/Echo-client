import { configureStore, combineReducers } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core'
import { watcherSaga } from './sagas/rootSaga'
import authReducer from './auth/authSlice'

const sagaMiddleWare = createSagaMiddleware()

const reducer = combineReducers({
    auth: authReducer,
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleWare),
})
sagaMiddleWare.run(watcherSaga)

export default store