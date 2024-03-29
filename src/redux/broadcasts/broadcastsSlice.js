import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  broadcasts: [],
  broadcast: {},
  userProfile: {},
  loading: false
}

export const broadcastsSlice = createSlice({
  name: 'broadcasts',
  initialState,
  reducers: {
    loading (state, action) {
      return { ...state, loading: true }
    },
    setBroadcasts (state, action) {
      const data = action.payload
      return {
        ...state,
        broadcasts: data,
        loading: false
      }
    },
    clearBroadcasts (state, action) {
      return { ...state, broadcasts: [] }
    },
    loadingBroadcast (state, action) {
      return { ...state, loading: true }
    },
    broadcastSliceSetBroadcast (state, action) {
      const data = action.payload
      return {
        ...state,
        broadcast: data,
        loading: false
      }
    },
    broadcastSliceClearBroadcast (state, action) {
      return { ...state, broadcast: {} }
    },
    broadcastSliceLikeBroadcast (state, action) {
      let updatedBroadcast = state.broadcast
      let updatedBroadcasts = state.broadcasts.map(broadcast => {
        if (broadcast.broadcastId === action.payload.broadcastId) {
          broadcast = action.payload
        }
        return broadcast
      })
      if (state.broadcast.broadcastId === action.payload.broadcastId) {
        updatedBroadcast = action.payload
      }
      return {
        ...state,
        broadcast: updatedBroadcast,
        broadcasts: updatedBroadcasts
      }
    },
    broadcastSliceUnlikeBroadcast (state, action) {
      let updatedBroadcast = state.broadcast
      let updated = state.broadcasts.map(broadcast => {
        if (broadcast.broadcastId === action.payload.broadcastId) {
          broadcast = action.payload
        }
        return broadcast
      })
      if (state.broadcast.broadcastId === action.payload.broadcastId) {
        updatedBroadcast = action.payload
      }
      return {
        ...state,
        broadcast: updatedBroadcast,
        broadcasts: updated
      }
    },
    broadcastSliceDeleteBroadcast (state, action) {
      let updatedBroadcasts = state.broadcasts.filter(
        b => b.broadcastId !== action.payload
      )
      return {
        ...state,
        broadcasts: updatedBroadcasts
      }
    },
    broadcastSlicePostBroadcast (state, action) {
      return {
        ...state,
        broadcasts: [action.payload, ...state.broadcasts]
      }
    },
    broadcastSliceSubmitComment (state, action) {
      return {
        ...state,
        broadcast: {
          ...state.broadcast,
          commentCount: state.broadcast.commentCount + 1,
          comments: [action.payload, ...state.broadcast.comments]
        }
      }
    },
    broadcastSliceIncrementCommentCount (state, action) {
      state.broadcasts.forEach(b => {
        if (b.broadcastId === action.payload.broadcastId) b.commentCount++
      })
      return state
    },
    broadcastsSliceSetUserProfile (state, action) {
      return {
        ...state,
        userProfile: action.payload
      }
    },
    broadcastsSliceClearUserProfile (state, action) {
      return {
        ...state,
        userProfile: {}
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setBroadcasts,
  clearBroadcasts,
  broadcastSliceLikeBroadcast,
  broadcastSliceUnlikeBroadcast,
  broadcastSliceDeleteBroadcast,
  broadcastSlicePostBroadcast,
  broadcastSliceSetBroadcast,
  broadcastSliceClearBroadcast,
  broadcastSliceSubmitComment,
  broadcastsSliceSetUserProfile,
  broadcastsSliceClearUserProfile,
  loadingBroadcast,
  broadcastSliceIncrementCommentCount
} = broadcastsSlice.actions

export default broadcastsSlice.reducer
