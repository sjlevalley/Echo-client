import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  authenticated: false,
  userDetails: null,
  error: false,
  loading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadingUser(state, action) {
      return { ...state, loading: true }
    },
    setUserToken(state, action) {
      const userTokenData = action.payload
      return { ...state, user: userTokenData, authenticated: true }
    },
    setUserData(state, action) {
      const userData = action.payload

      return { ...state, loading: false, userDetails: userData }
    },
    clearUser(state, action) {
      return { ...state, user: null, userDetails: null, authenticated: false }
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  getUser,
  loadingUser,
  clearUser,
  setUserData,
  setUserToken
} = userSlice.actions

export default userSlice.reducer
