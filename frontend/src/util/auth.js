import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const currentUserQUERY = gql`
  query currentUser {
    currentUser {
      id
      username
      name
      profile_image
      website_url
      bio
      location
      education
      employer_name
      twitter_username
      github_username
      email
      jwt
    }
  }
`

export const CurrentUser = graphql(currentUserQUERY, {
  alias: 'CurrentUser',
  options: { fetchPolicy: 'cache-first' },
  props: ({ data: { currentUser, loading } }) => ({ currentUser, loading }),
})

const LoginMUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
      id
      username
    }
  }
`

const registerMUTATION = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      email
      username
      jwt
    }
  }
`

export const RegisterMutation = graphql(registerMUTATION, {
  alias: 'Register',
  props: ({ mutate }) => ({
    register: (email, username, password) =>
      mutate({
        variables: { email, username, password },
        update: (proxy, { data: { register } }) => {
          // update the cache with the new currentUser
          const currentUser = {
            id: register.id,
            username: register.username,
            email,
            jwt: register.jwt,
          }

          proxy.writeQuery({ query: currentUserQUERY, data: { currentUser } })

          // Store the token
          localStorage.setItem('token', register.jwt)
        },
      }),
  }),
})

export const LoginMutation = graphql(LoginMUTATION, {
  alias: 'Login',
  props: ({ mutate }) => ({
    login: (email, password) =>
      mutate({
        variables: { email, password },
        update: (proxy, { data: { login } }) => {
          // update the cache with the new currentUser
          const currentUser = {
            id: login.id,
            username: login.username,
            email,
            jwt: login.jwt,
          }

          proxy.writeQuery({ query: currentUserQUERY, data: { currentUser } })

          // Store the token
          localStorage.setItem('token', login.jwt)
        },
      }),
  }),
})
