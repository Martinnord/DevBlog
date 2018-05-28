import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Spinner from '../common/Spinner'
import Loadable from 'react-loadable'


const AsyncHome = Loadable({
  loader: () => import('./Home/Home.js'),
  loading: Spinner
})

const AsyncRegister = Loadable({
  loader: () => import('./Register/Register.js'),
  loading: Spinner
})

const AsyncLogin = Loadable({
  loader: () => import('./Login/Login.js'),
  loading: Spinner
})

const AsyncNewPost = Loadable({
  loader: () => import('./NewPost/NewPost.js'),
  loading: Spinner
})

const AsyncEditPost = Loadable({
  loader: () => import('./EditPost/EditPost.js'),
  loading: Spinner
})

const AsyncProfile = Loadable({
  loader: () => import('./Profile/Profile.js'),
  loading: Spinner
})

const AsyncPostLayout = Loadable({
  loader: () => import('./PostLayout/PostLayout.js'),
  loading: Spinner
})

const AsyncNotFound = Loadable({
  loader: () => import('./PageNotFound/PageNotFound.js'),
  loading: Spinner
})

const AsyncSettings = Loadable({
  loader: () => import('./Settings/Settings.js'),
  loading: Spinner
})

const AsyncNewUser = Loadable({
  loader: () => import('./NewUser/NewUser.js'),
  loading: Spinner
})

const AsyncAbout = Loadable({
  loader: () => import('./About/About.js'),
  loading:Spinner
})

const AsyncContact = Loadable({
  loader: () => import('./Contact/Contact.js'),
  loading: Spinner
})

const App = () => (
  <Router>
    <div
      style={{
        height: '100%'
      }}
    >
      <Switch>
        <Route exact path="/" component={AsyncHome} />
        <Route exact path="/new-article" component={AsyncNewPost} />
        <Route exact path="/register" component={AsyncRegister} />
        <Route exact path="/login" component={AsyncLogin} />
        <Route exact path="/@:username" component={AsyncProfile} />
        <Route exact path="/@:username/:id" component={AsyncPostLayout} />
        <Route exact path="/@:username/:id/edit" component={AsyncEditPost} />
        <Route exact path="/new" component={AsyncNewUser} />
        <Route exact path="/about" component={AsyncAbout} />
        <Route exact path="/contact" component={AsyncContact} />
        <Route exact path="/settings" component={AsyncSettings} />
        <Route component={AsyncNotFound} />
      </Switch>
    </div>
  </Router>
)

export default App
