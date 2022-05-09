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
      let updated = state.broadcasts.map(broadcast => {
        if (broadcast.broadcastId === action.payload.broadcastId) {
          broadcast = action.payload
        }
        return broadcast
      })
      return {
        ...state,
        broadcasts: updated,
        loading: false
      }
    },
    broadcastSliceUnlikeBroadcast(state, action) {
      let updated = state.broadcasts.map(broadcast => {
        if (broadcast.broadcastId === action.payload.broadcastId) {
          broadcast = action.payload
        }
        return broadcast
      })
      return {
        ...state,
        broadcasts: updated,
        loading: false
      }
    },
    broadcastSliceDeleteBroadcast(state, action) {
      let updated = state.broadcasts.filter((b) => b.broadcastId !== action.payload)
      return {
        ...state,
        broadcasts: updated
      }
    },
    broadcastsPostBroadcast(state, action) {
      return {
        ...state,
        broadcasts: [
          action.payload,
          ...state.broadcasts
        ]
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
  broadcastsPostBroadcast
} = broadcastsSlice.actions

export default broadcastsSlice.reducer
