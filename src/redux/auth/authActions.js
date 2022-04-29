// Import the reducers from each respective state slice. 
import { setError } from '../ui/uiSlice';
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import { getUser, setUser } from './authSlice';

// Action Creator Thunk (A function that can return another function as well as execute asynchronous functions). This action creator is used to fetch the user data from the Firebase database.
export const login = (userData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('/api/login', userData);
            let { token } = data
            token = jwtDecode(token)
            const userInfo = {
                email: token.email,
                token_exp: token.exp
            }
            dispatch(setUser(userInfo))
        } catch (e) {
            dispatch(setError(e.response.data))
        }
    };
};

export const signup = (userData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('/api/signup', userData);
            let { token } = data
            token = jwtDecode(token)
            const userInfo = {
                email: token.email,
                token_exp: token.exp
            }
            dispatch(setUser(userInfo))
        } catch (e) {
            dispatch(setError(e.response.data))
        }
    };
};
