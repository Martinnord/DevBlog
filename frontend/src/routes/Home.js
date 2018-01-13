import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React, { Component } from 'react'
import { Layout, Card, Col, Row } from 'antd'
import moment from 'moment'
import PostCard from '../components/Postcard'
import Navbar from '../common/Navbar'

const { Content } = Layout
const { Meta } = Card

class Home extends Component {
  render() {
    const { data: { loading, error, getPosts = [] } } = this.props

    if (loading) {
      console.log('loading...')
    }

    return (
      <Layout style={{ background: '#ECECEC' }}>
        <Navbar currentUser={this.props.currentUser} />
        <Content>
          <Row
            gutter={16}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Col span={8}>
              <PostCard posts={getPosts} />
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

const getPostsQuery = gql`
  query getPostsQuery {
    getPosts {
      id
      title
      content
      createdAt
    }
  }
`

export default graphql(getPostsQuery)(Home)
