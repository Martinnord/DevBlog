import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React, { Component } from 'react'
import { Layout, Col, Row } from 'antd'
import PostCard from '../components/Postcard'
import Navbar from '../common/Navbar'

const { Content } = Layout

class Home extends Component {
  render() {
    const { data: { loading, error, getAllPosts = [] } } = this.props
    console.log(getAllPosts)
    if (loading) {
      return null
    }

    if (error) {
      return <h1>Shit just hit the fan!</h1>
    }

    return (
      <Layout style={{ background: '#ECECEC' }}>
        <Navbar currentUser={this.props.currentUser} />
        <Content>
          <Row
            gutter={16}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Col span={9}>
              <PostCard posts={getAllPosts} />
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

const getAllPostsQuery = gql`
  query getAllPostsQuery {
    getAllPosts {
      id
      title
      content
      createdAt
      user {
        username
      }
    }
  }
`

export default graphql(getAllPostsQuery)(Home)
