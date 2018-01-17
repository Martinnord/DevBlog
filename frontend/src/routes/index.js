import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import NewArticle from './NewArticle'

const meQuery = gql`
  query meQuery {
    currentUser {
      id
      username
      email
    }
  }
`

const PRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (
          <Component
            {...props}
            currentUser={
              rest.meQuery.currentUser ? rest.meQuery.currentUser : null
            }
          />
        )
      }}
    />
  )
}

const PrivateRoute = graphql(meQuery, { name: 'meQuery' })(PRoute)

const App = () => (
  <Router>
    <div>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/new-article" component={NewArticle} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </div>
  </Router>
)

export default App
