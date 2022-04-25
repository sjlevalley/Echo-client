import * as actions from './actions'
import * as actionTypes from './actionTypes'
import * as api from './api'
import * as sagas from './sagas'
import * as selectors from './selectors'
import reducer from './reducer'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    actions,
    actionTypes,
    api,
    reducer,
    sagas,
    selectors
}