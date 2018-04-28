import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { Layout, Row } from 'antd'
import PostCard from '../components/Postcard'
import Navbar from '../common/Navbar'
import FooterComponent from '../common/Footer'
import GET_ALL_POSTS_QUERY from '../graphql/queries/getAllPosts'
import './index.css'

const { Content } = Layout

class Home extends Component {
  render() {
    const {
      data: { loading, getAllPosts = [] }
    } = this.props

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
          <Row className="no-margin-uptop-row">
            <PostCard posts={getAllPosts} />
          </Row>
        </Content>
        <FooterComponent />
      </Layout>
    )
  }
}

export default graphql(GET_ALL_POSTS_QUERY)(Home)
