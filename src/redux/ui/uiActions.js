import axios from 'axios'
import jwtDecode from 'jwt-decode';
import { getUser, setUser } from './uiSlice';

// Action Creator Thunk (A function that can return another function as well as execute asynchronous functions). This action creator is used to fetch the user data from the Firebase database.
// export const login = (userData) => {
//     return async (dispatch) => {
//         try {
//             const { data } = await axios.post('/api/login', userData);
//             let { token } = data
//             token = jwtDecode(token)
//             const userInfo = {
//                 email: token.email,
//                 token_exp: token.exp
//             }
//             dispatch(setUser(userInfo))
//         } catch (e) {
//             console.log(`${e.response.status} - ${e.response.statusText}`)
//             // Set an error in the store here
//         }
//     };
// };
