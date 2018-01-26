import React, { Component } from 'react'
import { CurrentUser } from '../util/auth'
import { compose, graphql } from 'react-apollo'
import { Layout, Col, Row } from 'antd'
import PostCard from '../components/Postcard'
import Navbar from '../common/Navbar'
import gql from 'graphql-tag'

const { Content } = Layout

class Profile extends Component {
  render() {
    const { data: { loading, getUserPosts = [] } } = this.props
    console.log()

    if (loading) {
      return null
    }

    return (
      <Layout style={{ background: '#ECECEC' }}>
        <Navbar />
        <Content>
          <Row
            gutter={15}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Col span={9}>
              <PostCard posts={getUserPosts} />
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
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

export default graphql(getUserPostsQuery)(Profile)

// export default compose(
//   graphql(CurrentUser, {
//     name: 'CurrentUser'
//   }),
//   graphql(getUserPostsQuery, {
//     name: 'getUserPostsQuery'
//   })
// )(Profile)
