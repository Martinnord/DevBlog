import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import App from './routes'
import constants from './config'

import 'antd/dist/antd.css'
import './styles/css/index.css'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

console.log('constants', constants)

const httpLink = createHttpLink({
  // uri: 'http://devblogapi.vyralynn.com/graphql'
  uri: 'http://192.168.50.147:3010/graphql'
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const Application = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

render(Application, document.getElementById('root'))
