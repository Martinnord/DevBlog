import gql from 'graphql-tag'

export default gql`
  query($username: String!) {
    getUser(username: $username) {
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
