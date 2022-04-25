import { takeLatest } from 'redux-saga/effects'
import { handleGetUser } from './auth/authSlice'
import { getUser } from '../auth/authSlice'

export function* watcherSaga() {
    yield takeLatest(getUser.type, handleGetUser)
}