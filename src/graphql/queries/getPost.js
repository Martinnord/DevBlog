import gql from 'graphql-tag'

export default gql`
  query($id: Int!) {
    getPost(id: $id) {
      id
      title
      content
      image_url
      is_liked
      created_at
      likes {
        id
        username
        profile_image
      }
      user {
        id
        name
        username
        profile_image
        bio
        twitter_username
        github_username
      }
    }
  }
`
