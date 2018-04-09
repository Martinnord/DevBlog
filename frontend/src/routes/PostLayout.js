import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Layout, Row, Col } from 'antd'
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

    const JsonObj = JSON.parse(getPost.content)
    const newSlate = Value.fromJSON(JsonObj)
    console.log('json', JsonObj)

    return (
      <Layout style={{ background: '#ECECEC' }}>
        <Navbar />
        <Content>
          <hr className="hr" />
          <Row>
            <Col span={12} offset={6}>
              <div style={{ display: 'flex' }}>
                <Editor
                  className={'post-content'}
                  readOnly
                  value={newSlate}
                  onChange={this.onChange}
                  renderMark={this.renderMark}
                />
              </div>
            </Col>
            {/* <Post post={newSlate} /> */}
          </Row>
        </Content>
      </Layout>
    )
  }

  renderMark = props => {
    const { children, mark } = props
    switch (mark.type) {
      case 'bold':
        return <strong>{children}</strong>
      case 'code':
        return <code>{children}</code>
      case 'italic':
        return <em>{children}</em>
      case 'underlined':
        return <u>{children}</u>
    }
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
    variables: { id: props.match.params.id }
  })
})(PostLayout)
