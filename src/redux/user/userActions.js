// Import the reducers from each respective state slice.
import { setError } from '../ui/uiSlice'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { loadingUser, setUserToken, setUserData, clearUser } from './userSlice'
import { loadingUIFalse, loadingUITrue } from '../ui/uiSlice'

// Action Creator Thunk (A function that can return another function as well as execute asynchronous functions). This action creator is used to fetch the user data from the Firebase database.
export const login = (userData, navigate) => {
  return async dispatch => {
    dispatch(loadingUITrue())
    try {
      const { data } = await axios.post('/api/login', userData)
      let { token } = data
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      dispatch(getUserData())
      token = jwtDecode(token)
      const userInfo = {
        email: token.email,
        token_exp: token.exp
      }
      dispatch(setUserToken(userInfo))
      dispatch(loadingUIFalse())
      navigate('/')
    } catch (e) {
      dispatch(setError(e.response.data))
    }
  }
}

export const signup = (userData, navigate) => {
  return async dispatch => {
    dispatch(loadingUITrue())
    try {
      const { data } = await axios.post('/api/signup', userData)
      let { token } = data
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      token = jwtDecode(token)
      const userInfo = {
        email: token.email,
        token_exp: token.exp
      }
      dispatch(setUserToken(userInfo))
      dispatch(loadingUIFalse())
      navigate('/')
    } catch (e) {
      dispatch(setError(e.response.data))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    try {
      delete axios.defaults.headers.common['Authorization']
      dispatch(clearUser())
      dispatch(loadingUIFalse())
    } catch (e) {
      dispatch(setError(e.response.data))
    }
  }
}

export const getUserData = () => {
  return async dispatch => {
    dispatch(loadingUser())
    try {
      const { data } = await axios.get('/api/user')
      dispatch(setUserData(data))
    } catch (e) {
      dispatch(setError(e.response.data))
    }
  }
}

export const uploadImage = formData => {
  return async dispatch => {
    dispatch(loadingUser())
    try {
      const { data } = await axios.post('/api/user/image', formData)
      console.log(data)
      // Maybe throw an alert if successful
      dispatch(getUserData())
    } catch (e) {
      dispatch(setError(e.response.data))
      console.error(e)
    }
  }
}

export const editUserDetails = userDetails => {
  return async dispatch => {
    dispatch(loadingUser())
    try {
      const { data } = await axios.post('/api/user', userDetails)
      console.log(data)
      // Maybe throw a notification if successful
      dispatch(getUserData())
    } catch (e) {
      dispatch(setError(e.response.data))
      console.error(e)
    }
  }
}
