import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Layout, Col, Row } from 'antd'
import moment from 'moment'
import Navbar from '../common/Navbar'
import Post from '../components/Post'
import './index.css'

const { Content } = Layout

const PostLayout = ({ data }) => {
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
        <hr className="hr" />
        <Row type="flex" justify="center">
          <Post post={getPost} />
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
      content
      imageUrl
      createdAt
      user {
        username
      }
    }
  }
`

export default graphql(getPostQuery, {
  skip: props => !parseInt(props.match.params.id),
  options: props => ({
    variables: { id: props.match.params.id }
  })
})(PostLayout)
