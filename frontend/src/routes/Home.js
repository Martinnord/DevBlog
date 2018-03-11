import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Layout, Row } from 'antd'
import { EditorState, Editor, convertToRaw, convertFromRaw } from 'draft-js';

import PostCard from '../components/Postcard'
import Navbar from '../common/Navbar'

const { Content } = Layout

class Home extends Component {
  render() {
    const { data: { loading, getAllPosts = [] } } = this.props
    if (loading) {
      return null
    }


    console.log(getAllPosts)
    // convertFromRaw(JSON.parse(this.props.blogPost.content))
    // console.log(convertFromRaw(JSON.parse(getAllPosts)))
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
      content
      createdAt
      user {
        username
      }
    }
  }
`
export default graphql(getAllPostsQuery)(Home)
