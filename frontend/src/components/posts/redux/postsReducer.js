const initialState = {}

export const fetchPosts = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload.setPosts.posts } // Should I really need .posts

    default:
      return state
  }
}

export const fetchPostsIsLoading = (state = false, action) => {
  switch (action.type) {
    case 'POSTS_IS_LOADING':
      return { ...state, isLoading: action.payload.isLoading }

    default:
      return state
  }
}
