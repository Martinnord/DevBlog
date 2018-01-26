import gql from 'graphql-tag'

export const getAllPostsQuery = gql`
  {
    getAllPosts {
      id
      title
      content
      createdAt
    }
  }
`
