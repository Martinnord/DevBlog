import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'

export const client = new ApolloClient({
  link: new createHttpLink({ uri: 'http://localhost:3010/graphql' }),
  cache: new InMemoryCache()
})
