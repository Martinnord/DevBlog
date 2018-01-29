import React from 'react'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { CurrentUser } from '../util/auth'
import { compose, graphql } from 'react-apollo'
import { Layout, Col, Row } from 'antd'
import PostCard from '../components/Postcard'
import Navbar from '../common/Navbar'

const { Content } = Layout

const Post = ({ data }) => {
  console.log('data', data)
  if (!data) {
    return <Redirect to={{ pathname: '/404' }} />
  }

  const { loading, getUser } = data
  // const { posts = [] } = getUser || ''

  if (loading) {
    return null
  }

  if (!loading && !getUser) {
    return <Redirect to={{ pathname: '/404' }} />
  }

  return (
    <Layout style={{ background: '#ECECEC' }}>
      <Navbar />
      <Content>
        <Row gutter={15} style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>{getUser.username}</h1>
          <Col span={9}>

          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

const getPostQuery = gql`
  query($id: Int!) {
    getPost(id: $id) {
      title
    }
  }
`

export default graphql(getPostQuery, {
  skip: props => !parseInt(props.match.params.id),
  options: props => ({
    variables: { id: props.match.params.id }
  })
})(Post)

/*


  return (
    <Layout style={{ background: '#ECECEC' }}>
      <Navbar />
      <Content>
        <Row gutter={15} style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>{getUser.username}</h1>
          <Col span={9}>
            <PostCard posts={getUser.posts} />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

const getUserQuery = gql`
  query($username: String!) {
    getUser(username: $username) {
      username
      posts {
        title
        content
        user {
          username
        }
      }
    }
  }
`

export default graphql(getUserQuery, {
  skip: props => !props.match.params.username,
  options: props => ({
    variables: { username: props.match.params.username },
  }),
})(Profile)

// export default compose(
//   graphql(CurrentUser, {
//     name: 'CurrentUser'
//   }),
//   graphql(getUserPostsQuery, {
//     name: 'getUserPostsQuery'
//   })
// )(Profile)

*/
