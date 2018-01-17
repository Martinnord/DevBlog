import gql from 'graphql-tag'

export const meQuery = gql`
 {
  currentUser {
    id
    username
    email
  }
}
`
