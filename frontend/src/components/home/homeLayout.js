import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React from 'react'

const HomeLayout = ({ data: { loading, getUsers, error } }) => {
  console.log(getUsers)
  return (
    <div>
      {/*loading ? null : getUsers.map(u => <h1 key={u.id}>{u.name}</h1>*/}
    </div>
  )
}

const allUsersQuery = gql`
  query allUsersQuery {
    getUsers {
      id
      email
    }
  }
`

export default graphql(allUsersQuery)(HomeLayout)
