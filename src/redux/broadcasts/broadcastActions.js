// Import the reducers from each respective state slice.
import axios from 'axios'
import { setBroadcasts, clearBroadcasts, broadcastSliceLikeBroadcast, broadcastSliceUnlikeBroadcast } from './broadcastsSlice'
import { userSliceLikeBroadcast, userSliceUnlikeBroadcast } from '../user/userSlice'
import { loadingUIFalse, loadingUITrue, setError } from '../ui/uiSlice'

export const fetchAllBroadcasts = () => {
  return async dispatch => {
    dispatch(loadingUITrue())
    try {
      const { data } = await axios.get('/api/broadcasts')
      dispatch(setBroadcasts(data))
    } catch (e) {
      console.error(e)
      dispatch(setError(e.response.data))
      dispatch(clearBroadcasts())
    }
  }
}

export const likeBroadcastAction = (broadcastId) => {
  return async dispatch => {
    dispatch(loadingUITrue())
    try {
      const { data } = await axios.get(`/api/broadcast/${broadcastId}/like`)
      console.log(`LIKE`)
      dispatch(broadcastSliceLikeBroadcast(data))
      dispatch(userSliceLikeBroadcast(data))
    } catch (e) {
      console.error(e)
      dispatch(setError(e.response.data))
      // dispatch(clearBroadcasts())
    }
    // dispatch(loadingUIFalse())
  }
}

export const unlikeBroadcastAction = (broadcastId) => {
  return async dispatch => {
    dispatch(loadingUITrue())
    try {
      const { data } = await axios.get(`/api/broadcast/${broadcastId}/unlike`)
      console.log('UNLIKE')
      dispatch(broadcastSliceLikeBroadcast(data))
      dispatch(userSliceUnlikeBroadcast(data))
    } catch (e) {
      console.error(e)
      dispatch(setError(e.response.data))
      // dispatch(clearBroadcasts())
    }
    // dispatch(loadingUIFalse())
  }
}