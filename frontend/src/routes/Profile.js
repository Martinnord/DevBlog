import React from 'react'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Layout, Col, Row, Spin } from 'antd'
import PostCard from '../components/Postcard'
import Navbar from '../common/Navbar'

const { Content } = Layout

const Profile = ({ data }) => {
  if (!data) {
    return <Redirect to={{ pathname: '/404' }} />
  }

  const { loading, getUser } = data

  if (loading) {
    return <Spin size="large" />
  }

  if (!loading && !getUser) {
    return <Redirect to={{ pathname: '/404' }} />
  }

  return (
    <Layout style={{ background: '#ECECEC' }}>
      <Navbar />
      <Content>
        <Row gutter={15} style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>{getUser.username}</h1>
          <Col span={9}>
            <PostCard posts={getUser.posts} />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

const getUserQuery = gql`
  query($username: String!) {
    getUser(username: $username) {
      username
      bio
      posts {
        id
        title
        content
        imageUrl
        createdAt
        user {
          username
        }
      }
    }
  }
`

export default graphql(getUserQuery, {
  skip: props => !props.match.params.username,
  options: props => ({
    variables: { username: props.match.params.username },
  }),
})(Profile)
