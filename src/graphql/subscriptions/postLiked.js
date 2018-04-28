import gql from 'graphql-tag'

export default gql`
  subscription($id: ID!) {
    postLiked(id: $id) {
      id
      likes {
        id
        username
        profile_image
      }
    }
  }
`
