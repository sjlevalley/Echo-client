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
  broadcastSliceClearBroadcast,
  broadcastSliceSubmitComment,
  broadcastsSliceSetUserProfile,
  broadcastsSliceClearUserProfile
} from './broadcastsSlice'
import {
  authSliceLikeBroadcast,
  authSliceUnlikeBroadcast
} from '../auth/authSlice'
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
    try {
      const { data } = await axios.get(`/api/broadcast/${broadcastId}/like`)
      dispatch(broadcastSliceLikeBroadcast(data))
      dispatch(authSliceLikeBroadcast(data))
    } catch (e) {
      console.error(e)
      dispatch(setError(e.response.data))
    }
  }
}

export const unlikeBroadcastAction = broadcastId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/broadcast/${broadcastId}/unlike`)
      dispatch(broadcastSliceUnlikeBroadcast(data))
      dispatch(authSliceUnlikeBroadcast(data))
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

export const postBroadcastAction = (newBroadcast, handleClose, setBody) => {
  return async dispatch => {
    dispatch(clearError())
    try {
      const { data } = await axios.post(`/api/broadcast`, newBroadcast)
      handleClose()
      setBody(() => "")
      dispatch(broadcastSlicePostBroadcast(data))
    } catch (e) {
      console.error(e)
      dispatch(setError(e.response.data))
    }
  }
}

export const getSingleBroadcastAction = (broadcastId, setLoading) => {
  return async dispatch => {
    setLoading(() => true)
    dispatch(clearError())
    try {
      const { data } = await axios.get(`/api/broadcast/${broadcastId}`)
      dispatch(broadcastSliceSetBroadcast(data))
    } catch (e) {
      console.error(e)
      dispatch(setError(e.response.data))
    }
    setLoading(() => false)
  }
}

export const submitCommentBroadcastAction = (broadcastId, commentData) => {
  return async dispatch => {
    dispatch(clearError())
    try {
      const { data } = await axios.post(`/api/broadcast/${broadcastId}/comment`, commentData)
      dispatch(broadcastSliceSubmitComment(data))
    } catch (e) {
      console.error(e)
      dispatch(setError(e.response.data))
    }
    dispatch(loadingUIFalse())
  }
}

export const getUserDataBroadcastAction = (userName) => {
  return async dispatch => {
    dispatch(loadingUITrue())
    dispatch(clearError())
    try {
      const { data } = await axios.get(`/api/user/${userName}`)
      dispatch(setBroadcasts(data.broadcasts))
      dispatch(broadcastsSliceSetUserProfile(data.user))
    } catch (e) {
      console.error(e)
      dispatch(setError())
    }
    dispatch(loadingUIFalse())
  }
}

export const clearBroadcastBroadcastAction = () => {
  return async dispatch => {
    dispatch(broadcastSliceClearBroadcast())
  }
}
export const clearUserProfileBroadcastAction = () => {
  return async dispatch => {
    dispatch(broadcastsSliceClearUserProfile())
  }
}
