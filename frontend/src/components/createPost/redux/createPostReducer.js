const initialState = {}

export const createPost = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_POST':
      return {
        newPost: action.newPost
      }
    default:
      return state
  }
}
