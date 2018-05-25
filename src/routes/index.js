import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Loadable from 'react-loadable'

const Loading = () => <div>Loading...</div>

const AsyncHome = Loadable({
  loader: () => import ('./Home/Home.js'),
  loading: Loading
});

const AsyncRegister = Loadable({
  loader: () => import ('./Register/Register.js'),
  loading: Loading
});

const AsyncLogin = Loadable({
  loader: () => import ('./Login/Login.js'),
  loading: Loading
});

const AsyncNewPost = Loadable({
  loader: () => import ('./NewPost/NewPost.js'),
  loading: Loading
});

const AsyncEditPost = Loadable({
  loader: () => import ('./EditPost/EditPost.js'),
  loading: Loading
});

const AsyncProfile = Loadable({
  loader: () => import ('./Profile/Profile.js'),
  loading: Loading
});

const AsyncPostLayout = Loadable({
  loader: () => import ('./PostLayout/PostLayout.js'),
  loading: Loading
});

const AsyncNotFound = Loadable({
  loader: () => import ('./PageNotFound/PageNotFound.js'),
  loading: Loading
});

const AsyncSettings = Loadable({
  loader: () => import ('./Settings/Settings.js'),
  loading: Loading
});

const AsyncNewUser = Loadable({
  loader: () => import ('./NewUser/NewUser.js'),
  loading: Loading
});

const AsyncAbout = Loadable({
  loader: () => import ('./About/About.js'),
  loading: Loading
});

const AsyncContact = Loadable({
  loader: () => import ('./Contact/Contact.js'),
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
