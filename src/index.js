import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { getMainDefinition } from 'apollo-utilities'
import 'antd/dist/antd.css'
import constants from './config';
import App from './routes'

import './styles/css/index.css'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    },
  }
})

const httpLink = createHttpLink({ uri: constants.GRAPHQL_URL })

const wsClient = new SubscriptionClient(constants.GRAPHQL_SUBSCRIPTIONS_URL, {
  reconnect: true,
})

const httpLinkWithMiddleware = authLink.concat(httpLink)

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsClient,
  httpLinkWithMiddleware,
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

const Application = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

render(Application, document.getElementById('root'))
