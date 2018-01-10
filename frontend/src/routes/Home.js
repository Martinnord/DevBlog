import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React, { Component } from 'react'
import { Layout, Menu, Card, Col, Row } from 'antd'

const { Header, Content } = Layout
const { Meta } = Card

class Home extends Component {
  render() {
    const { data: { loading, error, getPosts = [] } } = this.props

    if (loading) {
      console.log('loading...')
    }

    const allPosts = getPosts.map(u => (
      <Card
        key={u.id}
        cover={
          <img
            alt="example"
            src="https://www.elegantthemes.com/blog/wp-content/uploads/2017/07/programming-languages-to-learn-for-wordpress-featured-image.png"
          />
        }
      >
        <Meta title={u.title} description={u.content} />
      </Card>
    ))

    return (
      <Layout style={{ background: '#ECECEC' }}>
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item>DEVBLOG</Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Row
            gutter={16}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Col span={8}>{allPosts}</Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

const getPostsQuery = gql`
  query getPostsQuery {
    getPosts {
      title
      content
      id
    }
  }
`

export default graphql(getPostsQuery)(Home)
