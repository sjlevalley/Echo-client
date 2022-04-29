import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    error: {}
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setError(state, action) {
            const errorObj = action.payload;
            return { ...state, error: errorObj };
        }
    },
})

// Action creators are generated for each case reducer function
export const { setError } = uiSlice.actions

export default uiSlice.reducer