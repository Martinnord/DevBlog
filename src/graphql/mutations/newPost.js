import gql from 'graphql-tag'

export default gql`
  mutation($title: String!, $content: String!, $image_url: String) {
    createPost(title: $title, content: $content, image_url: $image_url) {
      title
      content
      created_at
      image_url
    }
  }
`
