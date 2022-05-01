import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    errors: {},
    loading: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        clearError(state, action) {
            const errorObj = action.payload;
            return { ...state, errors: errorObj };
        },
        setError(state, action) {
            const errorObj = action.payload;
            return { ...state, errors: errorObj };
        },
        loadingUITrue(state) {
            return { ...state, loading: true }
        },
        loadingUIFalse(state) {
            return { ...state, loading: false }
        }
    },
})

// Action creators are generated for each case reducer function
export const { clearError, loadingUIFalse, loadingUITrue, setError } = uiSlice.actions

export default uiSlice.reducer