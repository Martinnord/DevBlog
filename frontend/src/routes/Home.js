import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React, { Component } from 'react'
import { Layout, Col, Row } from 'antd'
import PostCard from '../components/Postcard'
import Navbar from '../common/Navbar'

const { Content } = Layout

class Home extends Component {
  render() {
    const { data: { loading, error, getPosts = [] } } = this.props

    if (loading) {
      console.log('loading...')
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
