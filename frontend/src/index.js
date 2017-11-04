import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Router from './routes/router'
import store from './store'
import './styles/css/index.css'

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
)
