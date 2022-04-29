import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    errors: {}
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
        }
    },
})

// Action creators are generated for each case reducer function
export const { clearError, setError } = uiSlice.actions

export default uiSlice.reducer