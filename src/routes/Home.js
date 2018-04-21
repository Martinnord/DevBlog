import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { Layout, Row, Spin } from 'antd'
import PostCard from '../components/Postcard'
import Navbar from '../common/Navbar'

const { Content } = Layout

class Home extends Component {
  render() {
    const { data: { loading, getAllPosts = [] } } = this.props

    if (!this.props.data) {
      return <Redirect to={{ pathname: '/404' }} />
    }

    if (loading) {
      return null
    }

    if (!loading && !getAllPosts) {
      return <Redirect to={{ pathname: '/404' }} />
    }

    return (
      <Layout>
        <Navbar />
        <Content className="content">
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
      image_url
      likes {
        username
        profile_image
      }
      created_at
      user {
        username
      }
    }
  }
`
export default graphql(getAllPostsQuery)(Home)
