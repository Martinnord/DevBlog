import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import NewArticle from './NewArticle'
import Profile from './Profile'

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/new-article" component={NewArticle} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/:username" component={Profile} />
    </div>
  </Router>
)

export default App
