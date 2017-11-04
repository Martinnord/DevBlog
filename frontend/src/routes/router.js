import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import PostLayout from '../components/posts/postsLayout'
import CreatePostLayout from '../components/createPost/createPostLayout'
import LoginContainer from '../components/login/logincontainer'

export default props => (
  <Router>
    <div>
      <Route exact path="/" component={PostLayout} />
      <Route exact path="/agerallt" component={CreatePostLayout} />
			<Route exact path="/login" component={LoginContainer} />
    </div>
  </Router>
)
