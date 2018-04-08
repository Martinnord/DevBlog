import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Layout, Row } from 'antd'
import Navbar from '../common/Navbar'
import Post from '../components/Post'
import { Value } from 'slate'
import Plain from 'slate-plain-serializer'
import { Editor } from 'slate-react'



import './index.css'

const { Content } = Layout


class PostLayout extends Component {
  render() {
    const { loading, getPost } = this.props.data

    if (!this.props.data) {
      return <Redirect to={{ pathname: '/404' }} />
    }

    if (loading) {
      return null
    }

    if (!loading && !getPost) {
      return <Redirect to={{ pathname: '/404' }} />
    }

    const JsonObj = JSON.parse(getPost.content);
    const newSlate = Value.fromJSON(JsonObj);

    return (
      <Layout style={{ background: '#ECECEC' }}>
        <Navbar />
        <Content>
          <hr className="hr" />
          <Row>
            <Editor 
              readOnly
              value={newSlate}
              onChange={this.onChange}
            />
            {/* <Post post={newSlate} /> */}
          </Row>
        </Content>
      </Layout>
    )
  }
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
  skip: props => !props.match.params.id,
  options: props => ({
    variables: { id: props.match.params.id },
  }),
})(PostLayout)
