import axios from 'axios'
import settings from '../../../settings'
//import { addFlashMessage } from '../../Flash/flashMessageAction'

axios.defaults.baseURL = settings.hostname

export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    user
  }
}

// export const logout = event => {
//   return dispatch => {
//     localStorage.removeItem('token')
//     setAuthorizationToken(false)
//     dispatch(setCurrentUser({})) // Empty object for the user
//     window.location.href = '/login' // NOTE: Use react router instead
//   }
// }

export function login(data, props) {
  return dispatch => {
    axios
      .post(`${settings.hostname}/user/login`, data)
      .then(res => {
        console.log('res', res)
        const user = res.data
        // localStorage.setItem('token', token)
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
        // setAuthorizationToken(token)
        dispatch(setCurrentUser((user))) // Getting an output when the line below is commented out
        window.location.href = '/'
      })
      .catch(err => {
        dispatch(
          //addFlashMessage({ type: 'fail', text: 'Fel mail eller lösenord' })
        )
      })
  }
}
