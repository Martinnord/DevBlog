import axios from 'axios'
import settings from '../../../settings'

axios.defaults.baseURL = settings.hostname

export const schema = (title, content) => {
  return {
    type: 'HELLOO',
    payload: {
      title,
      content
    }
  }
}

export const createPost = (title, content) => {
  return dispatch => {
    dispatch({ type: 'LOADING' })
    axios.post(`${settings.hostname}/api/posts/`, title).then(res => {
      const body = res.data
      console.log(body)
      dispatch({ type: 'KLART', payload: body })
    })
  }
}
