import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'

const httpLink = createHttpLink({
  uri: 'http://localhost:3010/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  console.log(token)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
});

export default new ApolloClient({
  // link: new createHttpLink({ uri: 'http://localhost:3010/graphql' }),
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
