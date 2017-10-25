import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {
  fetchPosts,
  fetchPostsIsLoading
} from './components/posts/redux/postsReducer'
import { createPost } from './components/createPost/redux/createPostReducer'

export default combineReducers({
  fetchPostsIsLoading,
  fetchPosts,
  createPost,
  form: formReducer
})
