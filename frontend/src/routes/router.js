import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from '../components/home/homeLayout'
import Register from './Register'
import Login from './Login'

export default props => (
  <Router>
    <div>
      <Route exact path="/home" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </div>
  </Router>
)
