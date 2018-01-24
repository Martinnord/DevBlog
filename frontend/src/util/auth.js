import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const CurrentUser_QUERY = gql`
  query currentUser {
    currentUser {
      id
      username
      email
      jwt
    }
  }
`

export const CurrentUser = graphql(CurrentUser_QUERY, {
  alias: 'CurrentUser',
  options: { fetchPolicy: 'cache-first' },
  props: ({ data: { currentUser, loading } }) => ({ currentUser, loading }),
})

const Login_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
      id
    }
  }
`

export const LoginMutation = graphql(Login_MUTATION, {
  alias: 'Login',
  props: ({ mutate }) => ({
    login: (email, password) =>
      mutate({
        variables: { email, password },
        update: (proxy, { data: { login } }) => {
          // update the cache with the new currentUser
          // proxy.readQuery({ query: CurrentUser_QUERY })
          const currentUser = {
            id: login.id,
            // username: login.username,
            // email: login.email,
            jwt: login.jwt,
          }
          console.log(currentUser)
          proxy.writeQuery({ query: CurrentUser_QUERY, data: currentUser })
          
          //do something with the token
          localStorage.setItem('token', login.jwt)
        },
      }),
  }),
})
