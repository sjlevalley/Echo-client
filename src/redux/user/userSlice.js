import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  authenticated: false,
  bio: null,
  createdAt: null,
  imageUrl: null,
  location: null,
  userName: null,
  website: null,
  likes: [],
  notifications: [],
  error: false,
  loading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadingUser (state, action) {
      return { ...state, loading: true }
    },
    setUserToken (state, action) {
      const userTokenData = action.payload
      return {
        ...state,
        user: userTokenData,
        email: userTokenData.email,
        tokenExp: userTokenData.token_exp,
        authenticated: true
      }
    },
    setUserData (state, action) {
      const userData = action.payload
      return {
        ...state,
        loading: false,
        userName: userData.credentials.userName,
        bio: userData.credentials.bio,
        createdAt: userData.credentials.createdAt,
        imageUrl: userData.credentials.imageUrl,
        location: userData.credentials.location,
        userId: userData.credentials.userId,
        website: userData.credentials.website,
        likes: userData.likes,
        notifications: userData.notifications
      }
    },
    clearUser (state, action) {
      return { ...state, user: null, userDetails: null, authenticated: false }
    },
    userSliceLikeBroadcast (state, action) {
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userName: state.userName,
            broadcastId: action.payload.broadcastId
          }
        ]
      }
    },
    userSliceUnlikeBroadcast (state, action) {
      return {
        ...state,
        likes: state.likes.filter(
          like => like.broadcastId !== action.payload.broadcastId
        )
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  getUser,
  loadingUser,
  clearUser,
  setUserData,
  setUserToken,
  userSliceLikeBroadcast,
  userSliceUnlikeBroadcast
} = userSlice.actions

export default userSlice.reducer
