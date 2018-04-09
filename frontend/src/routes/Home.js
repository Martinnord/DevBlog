import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Layout, Row } from 'antd'
import PostCard from '../components/Postcard'
import Navbar from '../common/Navbar'

const { Content } = Layout

class Home extends Component {
  render() {
    const { data: { loading, getAllPosts = [] } } = this.props
    console.log(getAllPosts)
    // const text = getAllPosts.content.document.nodes[0].nodes[0].leaves[0].text || ''
    // console.log(text)
    if (loading) {
      return null
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
