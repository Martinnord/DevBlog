import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import 'antd/dist/antd.css'
import client from './client'
import Router from './routes'
import './styles/css/index.css'


const App = (
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>
)

render(App, document.getElementById('root'))
