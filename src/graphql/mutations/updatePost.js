import gql from 'graphql-tag'

export default gql`
  mutation($id: Int!, $title: String!, $content: String! $image_url: String) {
    updatePost(id: $id, title: $title, content: $content, image_url: $image_url) {
      id
      title
      content
      image_url
      likes {
        id
        username
      }
      user {
        id
      }
    }
  }
`
