import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  broadcasts: [],
  broadcast: {},
  loading: false
}

export const broadcastsSlice = createSlice({
  name: 'broadcasts',
  initialState,
  reducers: {
    loading(state, action) {
      return { ...state, loading: true }
    },
    setBroadcasts(state, action) {
      const data = action.payload
      return {
        ...state,
        broadcasts: data,
        loading: false
      }
    },
    clearBroadcasts(state, action) {
      return { ...state, broadcasts: [] }
    },
    broadcastSliceLikeBroadcast(state, action) {
      state.broadcasts.forEach((broadcast) => {
        if (broadcast.broadcastId === action.payload.broadcastId) {
          broadcast = action.payload
        }
        return broadcast
      })
      return {
        ...state, loading: false
      }
    },
    broadcastSliceUnlikeBroadcast(state, action) {
      state.broadcasts.forEach((broadcast) => {
        if (broadcast.broadcastId === action.payload.broadcastId) {
          broadcast = action.payload
        }
        return broadcast
      })
      return {
        ...state, loading: false
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  setBroadcasts,
  clearBroadcasts,
  broadcastSliceLikeBroadcast,
  broadcastSliceUnlikeBroadcast
} = broadcastsSlice.actions

export default broadcastsSlice.reducer
