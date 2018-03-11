import React from 'react'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Layout, Row, Col } from 'antd'
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
        <Row>
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
      content
      createdAt
      user {
        name
        username
        profileImage      
        bio
        twitterUsername
        githubUsername
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
