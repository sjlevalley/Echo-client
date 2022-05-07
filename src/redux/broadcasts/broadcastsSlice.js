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
      console.log(action.payload)
      let index = state.broadcasts.findIndex(broadcast => broadcast.broadcastId === action.payload.broadcastId)
      state.broadcasts[index] = action.payload
      return {
        ...state
      }
    },
    broadcastSliceUnlikeBroadcast(state, action) {
      console.log(action.payload)
      let index = state.broadcasts.findIndex(broadcast => broadcast.broadcastId === action.payload.broadcastId)
      state.broadcasts[index] = action.payload
      return {
        ...state
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
