import gql from 'graphql-tag'

export default gql`
  query getAllPostsQuery {
    getAllPosts {
      id
      title
      content
      image_url
      likes {
        id
        username
        profile_image
      }
      comments {
        id
        comment
      }
      created_at
      user {
        id
        username
      }
    }
  }
`
