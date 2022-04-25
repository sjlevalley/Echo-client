import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    error: false,
    loading: false,
    success: false,
    user: {},
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getUser() { },
        setUser: (state, action) => {
            const userData = action.payload
            return { ...state, ...userData }
        }
    },
})

// Action creators are generated for each case reducer function
export const { getUser, setUser } = authSlice.actions

export default authSlice.reducer