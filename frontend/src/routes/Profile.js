import React from 'react'
import { Redirect } from 'react-router-dom'
import { CurrentUser } from '../util/auth'
import { compose, graphql } from 'react-apollo'
import { Layout, Col, Row } from 'antd'
import PostCard from '../components/Postcard'
import Navbar from '../common/Navbar'
import gql from 'graphql-tag'

const { Content } = Layout

const Profile = ({ data }) => {
  if (!data) {
    return <Redirect to={{ pathname: '/404' }} />
  }

  const { loading, getUser } = data

  if (loading) {
    return 'loading...'
  }

  if (!loading && !getUser) {
    return <Redirect to={{ pathname: '/404' }} />
  }

  return (
    <Layout style={{ background: '#ECECEC' }}>
      <Navbar />
      <Content>
        <Row gutter={15} style={{ display: 'flex', justifyContent: 'center' }}>
          {getUser.username}
          <Col span={9}>{/* <PostCard posts={getUserPosts} /> */}</Col>
        </Row>
      </Content>
    </Layout>
  )
}

const getUserPostsQuery = gql`
  query getUserPostsQuery {
    getUserPosts {
      id
      title
      content
      createdAt
    }
  }
`

const getUserQuery = gql`
  query($id: Int!) {
    getUser(id: $id) {
      username
    }
  }
`

export default graphql(getUserQuery, {
  skip: props => !parseInt(props.match.params.id),
  options: props => ({
    variables: { id: props.match.params.id },
  }),
})(Profile)

// export default compose(
//   graphql(CurrentUser, {
//     name: 'CurrentUser'
//   }),
//   graphql(getUserPostsQuery, {
//     name: 'getUserPostsQuery'
//   })
// )(Profile)
