import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React from 'react'

const Home = ({ data: { getPosts = [] } }) =>
  getPosts.map(u => <h1 key={u.id}>{u.title}</h1>)

const getPostsQuery = gql`
  query getPostsQuery {
    getPosts {
      title
      content
    }
  }
`

export default graphql(getPostsQuery)(Home)
