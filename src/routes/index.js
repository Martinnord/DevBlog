import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import NewPost from './NewPost'
import EditPost from './EditPost'
import Profile from './Profile'
import PostLayout from './PostLayout'
import NotFound from './PageNotFound'
import Settings from './Settings'
import NewUser from './NewUser'
import About from './About'
import Contact from './Contact'

const App = () => (
  <Router>
    <div style={{ height: '100%' }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/new-article" component={NewPost} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/@:username" component={Profile} />
        <Route exact path="/@:username/:id" component={PostLayout} />
        <Route exact path="/@:username/:id/edit" component={EditPost} />
        <Route exact path="/new" component={NewUser} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)

export default (App)
