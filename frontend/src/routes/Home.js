import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Layout, Col, Row } from 'antd'
import PostCard from '../components/Postcard'
import Navbar from '../common/Navbar'

const { Content } = Layout

class Home extends Component {
  render() {
    const { data: { loading, getAllPosts = [] } } = this.props
    if (loading) {
      return 'loading'
    }

    return (
      <Layout style={{ background: '#ECECEC' }}>
        <Navbar />
        <Content>
          <Row>
            <PostCard posts={getAllPosts} />
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
      imageUrl
      createdAt
      user {
        username
      }
    }
  }
`
export default graphql(getAllPostsQuery)(Home)
