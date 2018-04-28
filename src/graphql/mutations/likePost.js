import gql from 'graphql-tag'

export default gql`
  mutation($id: ID!) {
    likePost(id: $id) {
      id
      likes {
        id
        username
        profile_image
      }
    }
  }
`
