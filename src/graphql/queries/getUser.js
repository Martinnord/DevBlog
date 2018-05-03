import gql from 'graphql-tag'

export default gql`
  query($username: String!, $id: ID) {
    getUser(username: $username id: $id) {
      name
      username
      profile_image
      bio
      twitter_username
      github_username
      posts {
        id
        title
        content
        image_url
        created_at
        user {
          id
          username
        }
        likes {
          id
          username
        }
      }
    }
  }
`
