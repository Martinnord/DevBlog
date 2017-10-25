import axios from 'axios'
import settings from '../../../settings'

axios.defaults.baseURL = settings.hostname

const setPosts = data => {
  return {
    type: 'SET_POSTS',
    payload: {
      setPosts: data
    }
  }
}

const setPostsIsLoading = bool => {
  return {
    type: 'POSTS_IS_LOADING',
    payload: {
      isLoading: bool
    }
  }
}

export const fetchPosts = () => async dispatch => {
  try {
    const posts = await axios.get(`${settings.hostname}/api/posts`)
    dispatch(setPostsIsLoading(false))
    dispatch(setPosts(posts.data))
  } catch (err) {
    throw err
  }
}
