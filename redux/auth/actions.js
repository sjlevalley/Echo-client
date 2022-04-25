import * as actionTypes from './actionTypes'

export function getUser() {
    return {
        type: actionTypes.GET_USER
    }
}

export function setUser() {
    return {
        type: actionTypes.SET_USER
    }
}

export function clearUser() {
    return {
        type: actionTypes.CLEAR_USER
    }
}