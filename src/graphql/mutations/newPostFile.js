import gql from 'graphql-tag'

export default gql`
  mutation($title: String!, $content: String!, $image_url: String, $file: File) {
    createPost(title: $title, content: $content, image_url: $image_url, file: $file) {
      title
      content
      created_at
      image_url
      file
    }
  }
`