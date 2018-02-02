import React from 'react'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Layout, Col, Row } from 'antd'
import Navbar from '../common/Navbar'

const { Content } = Layout

const Post = ({ data }) => {
  if (!data) {
    return <Redirect to={{ pathname: '/404' }} />
  }

  const { loading, getPost } = data

  if (loading) {
    return null
  }

  if (!loading && !getPost) {
    return <Redirect to={{ pathname: '/404' }} />
  }

  return (
    <Layout style={{ background: '#ECECEC' }}>
      <Navbar />
      <Content>
        <Row gutter={15} style={{ display: 'flex', justifyContent: 'center' }}>
          <Col span={9}>
            <img src={getPost.imageUrl} alt="post_image" />
            <h1>{getPost.title}</h1>
            <p>{getPost.content}</p>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

const getPostQuery = gql`
  query($id: Int!) {
    getPost(id: $id) {
      id
      title
      imageUrl
      content
    }
  }
`

export default graphql(getPostQuery, {
  skip: props => !parseInt(props.match.params.id),
  options: props => ({
    variables: { id: props.match.params.id }
  })
})(Post)
