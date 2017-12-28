import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { client } from './client'
import { ApolloProvider } from 'react-apollo'
import Router from './routes/router'
import store from './store'
import './styles/css/index.css'

const App = (
  <ApolloProvider client={client}>
    {/* <Provider store={store}> */}
    <Router />
    {/* </Provider> */}
  </ApolloProvider>
)

render(App, document.getElementById('root'))
