import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Loadable from 'react-loadable'

const Loading = () => <div>Loading...</div>

const AsyncHome = Loadable({
  loader: () => import ('./Home'),
  loading: Loading
});

const AsyncRegister = Loadable({
  loader: () => import ('./Register'),
  loading: Loading
});

const AsyncLogin = Loadable({
  loader: () => import ('./Login'),
  loading: Loading
});

const AsyncNewPost = Loadable({
  loader: () => import ('./NewPost'),
  loading: Loading
});

const AsyncEditPost = Loadable({
  loader: () => import ('./EditPost'),
  loading: Loading
});

const AsyncProfile = Loadable({
  loader: () => import ('./Profile'),
  loading: Loading
});

const AsyncPostLayout = Loadable({
  loader: () => import ('./PostLayout'),
  loading: Loading
});

const AsyncNotFound = Loadable({
  loader: () => import ('./PageNotFound'),
  loading: Loading
});

const AsyncSettings = Loadable({
  loader: () => import ('./Settings'),
  loading: Loading
});

const AsyncNewUser = Loadable({
  loader: () => import ('./NewUser'),
  loading: Loading
});

const AsyncAbout = Loadable({
  loader: () => import ('./About'),
  loading: Loading
});

const AsyncContact = Loadable({
  loader: () => import ('./Contact'),
  loading: Loading
});

const App = () => (
  <Router>
    <div style={{
      height: '100%'
    }}>
      <Switch>
        <Route exact path="/" component={AsyncHome}/>
        <Route exact path="/new-article" component={AsyncNewPost}/>
        <Route exact path="/register" component={AsyncRegister}/>
        <Route exact path="/login" component={AsyncLogin}/>
        <Route exact path="/@:username" component={AsyncProfile}/>
        <Route exact path="/@:username/:id" component={AsyncPostLayout}/>
        <Route exact path="/@:username/:id/edit" component={AsyncEditPost}/>
        <Route exact path="/new" component={AsyncNewUser}/>
        <Route exact path="/about" component={AsyncAbout}/>
        <Route exact path="/contact" component={AsyncContact}/>
        <Route exact path="/settings" component={AsyncSettings}/>
        <Route component={AsyncNotFound}/>
      </Switch>
    </div>
  </Router>
)

export default(App)
