import React from 'react'
import App from './routes'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import 'antd/dist/antd.css'
import client from './client'
import Router from './routes'
import './styles/css/index.css'


const Application = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

render(Application, document.getElementById('root'))
