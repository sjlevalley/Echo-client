import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as actionTypes from './actionTypes'
// import * as uiActionTypes from '../ui/actionTypes'
import * as api from './api'
// import { validateReceivedData } from '../commonFunctions'
// import { appConstants } from '../../appConstants'

// export function * checkDataType (data) {
//   let d = data
//   if (typeof data === 'string') {
//     d = []
//     yield put({
//       type: uiActionTypes.SET_MESSAGE,
//       title: 'error',
//       message: `${appConstants.TOKEN_ERROR}`
//     })
//   }
//   return d
// }

export function* getUser() {
    //   try {
    //     let { data } = yield call(api.getCoveys)
    //     data = yield validateReceivedData(
    //       data,
    //       'Coveys',
    //       actionTypes.GET_COVEYS_SUCCESS
    //     )
    //     yield put({
    //       type: actionTypes.GET_COVEYS_SUCCESS,
    //       data
    //     })
    //   } catch (e) {
    //     yield all([
    //       put({
    //         type: uiActionTypes.SET_MESSAGE,
    //         title: 'error',
    //         message: `${e.response.status} - ${appConstants.REQUEST_ERROR}`
    //       }),
    //       put({
    //         type: actionTypes.GET_COVEYS_ERROR
    //       })
    //     ])
    //   }
}

export function* setUser({ data }) {
    yield put({
        type: actionTypes.SET_USER_SUCCESS,
        data
    })
}

export function* clearUser() {
    yield put({
        type: actionTypes.CLEAR_USER_SUCCESS
    })
}

export const watchers = [
    takeLatest(actionTypes.SET_USER, setUser),
    takeLatest(actionTypes.CLEAR_USER, clearUser),
    //   takeLatest(actionTypes.GET_TAG_COVEYS, getTagCoveys)
]