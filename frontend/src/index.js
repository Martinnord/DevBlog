import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import 'antd/dist/antd.css'
import client from './client'
import Router from './routes/router'
import store from './store'
import './styles/css/index.css'


const App = (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router />
    </Provider>
  </ApolloProvider>
)

render(App, document.getElementById('root'))
