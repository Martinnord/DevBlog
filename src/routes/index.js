import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home/Home.js'
import Register from './Register/Register.js'
import Login from './Login/Login.js'
import NewPost from './NewPost/NewPost.js'
import EditPost from './EditPost/EditPost.js'
import Profile from './Profile/Profile.js'
import PostLayout from './PostLayout/PostLayout.js'
import NotFound from './PageNotFound/PageNotFound.js'
import Settings from './Settings/Settings.js'
import NewUser from './NewUser/NewUser.js'
import About from './About/About.js'
import Contact from './Contact/Contact.js'

const App = () => (
  <Router>
    <div
      style={{
        height: '100%'
      }}
    >
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

export default App
