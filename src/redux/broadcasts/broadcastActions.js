// Import the reducers from each respective state slice.
import axios from 'axios'
import {
  setBroadcasts,
  clearBroadcasts,
  broadcastSliceLikeBroadcast,
  broadcastSliceUnlikeBroadcast,
  broadcastSliceDeleteBroadcast,
  broadcastSlicePostBroadcast,
  broadcastSliceSetBroadcast,
  broadcastSliceClearBroadcast
} from './broadcastsSlice'
import {
  userSliceLikeBroadcast,
  userSliceUnlikeBroadcast
} from '../user/userSlice'
import {
  loadingUITrue,
  setError,
  clearError,
  loadingUIFalse
} from '../ui/uiSlice'

export const fetchAllBroadcasts = () => {
  return async dispatch => {
    dispatch(loadingUITrue())
    try {
      const { data } = await axios.get('/api/broadcasts')
      dispatch(setBroadcasts(data))
      dispatch(loadingUIFalse())
    } catch (e) {
      console.error(e)
      dispatch(setError(e.response.data))
      dispatch(clearBroadcasts())
    }
  }
}

export const likeBroadcastAction = broadcastId => {
  return async dispatch => {
    dispatch(loadingUITrue())
    try {
      const { data } = await axios.get(`/api/broadcast/${broadcastId}/like`)
      dispatch(broadcastSliceLikeBroadcast(data))
      dispatch(userSliceLikeBroadcast(data))
    } catch (e) {
      console.error(e)
      dispatch(setError(e.response.data))
    }
  }
}

export const unlikeBroadcastAction = broadcastId => {
  return async dispatch => {
    dispatch(loadingUITrue())
    try {
      const { data } = await axios.get(`/api/broadcast/${broadcastId}/unlike`)
      dispatch(broadcastSliceUnlikeBroadcast(data))
      dispatch(userSliceUnlikeBroadcast(data))
    } catch (e) {
      console.error(e)
      dispatch(setError(e.response.data))
    }
  }
}

export const deleteBroadcastAction = broadcastId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/broadcast/${broadcastId}`)
      dispatch(broadcastSliceDeleteBroadcast(broadcastId))
    } catch (e) {
      console.error(e)
      dispatch(setError(e.response.data))
    }
  }
}

export const postBroadcastAction = newBroadcast => {
  return async dispatch => {
    dispatch(clearError())
    dispatch(loadingUITrue())
    try {
      const { data } = await axios.post(`/api/broadcast`, newBroadcast)
      dispatch(broadcastSlicePostBroadcast(data))
      dispatch(loadingUIFalse())
    } catch (e) {
      console.error(e)
      dispatch(setError(e.response.data))
    }
  }
}

export const getSingleBroadcastAction = (broadcastId) => {
  return async dispatch => {
    dispatch(clearError())
    dispatch(loadingUITrue())
    try {
      console.log(broadcastId)
      const { data } = await axios.get(`/api/broadcast/${broadcastId}`)
      console.log(data)
      dispatch(broadcastSliceSetBroadcast(data))
      dispatch(loadingUIFalse())
    } catch (e) {
      console.error(e)
      dispatch(setError(e.response.data))
    }
  }
}
