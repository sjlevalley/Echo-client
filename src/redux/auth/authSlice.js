import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    error: false,
    loading: false,
    success: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getUser() { },
        setUser(state, action) {
            const userData = action.payload;
            return { ...state, user: userData };
        }
    },
})

// Action creators are generated for each case reducer function
export const { getUser, setUser } = authSlice.actions

export default authSlice.reducer