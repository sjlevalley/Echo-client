import * as actionTypes from './actionTypes'

const initialState = {
    userData: {
        data: [],
        error: false,
        loading: false,
        success: false
    }
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_USER: {
            return {
                ...state,
                userData: {
                    ...state.userData,
                    data: [],
                    loading: true,
                    error: false,
                    success: false
                }
            }
        }
        case actionTypes.GET_USER_SUCCESS: {
            const { data } = action
            return {
                ...state,
                userData: {
                    ...state.userData,
                    data: data,
                    loading: false,
                    success: true,
                    error: false
                }
            }
        }
        case actionTypes.GET_USER_ERROR: {
            return {
                ...state,
                userData: {
                    ...state.userData,
                    error: true,
                    loading: false,
                    success: false
                }
            }
        }
        case actionTypes.SET_USER_SUCCESS: {
            const { data } = action
            return {
                ...state,
                userData: {
                    ...state.userData,
                    data: data,
                    loading: false,
                    success: true,
                    error: false
                }
            }
        }
        case actionTypes.CLEAR_USER_SUCCESS: {
            return {
                ...state,
                userData: {
                    ...state.userData,
                    data: [],
                    loading: false,
                    success: true,
                    error: false
                }
            }
        }
        default:
            return state
    }
}