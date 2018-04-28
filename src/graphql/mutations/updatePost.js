import gql from 'graphql-tag'

export default gql`
  mutation($id: Int!, $title: String!, $content: String!) {
    updatePost(id: $id, title: $title, content: $content) {
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
