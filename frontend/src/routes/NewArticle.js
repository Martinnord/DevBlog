import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import gql from 'graphql-tag'
import yup from 'yup'
import { graphql } from 'react-apollo'
import { Layout, Col, Row, Input, Button, Alert } from 'antd'
import { Formik, Form } from 'formik'
import Navbar from '../common/Navbar'
import { getAllPostsQuery } from '../graphql/newArticle'
//import ArticleEditor from '../components/ArticleEditor'
import { EditorState, RichUtils, convertToRaw } from 'draft-js'
import createEmojiPlugin from 'draft-js-emoji-plugin'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import HoveringMenu from './HoveringMenu'
import './index.css'

const { TextArea } = Input
const { Content } = Layout

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'Tell your story...'
              }
            ]
          }
        ]
      }
    ]
  }
})

class NewArticle extends Component {
  state = {
    values: {
      content: initialValue
    }
  }

  submit = async () => {
    const { content } = this.state.values

    let response
    try {
      response = await this.props.mutate({
        variables: {
          content: JSON.stringify(this.state.values.content.toJSON())
        },
        update: (store, { data: { createPost } }) => {
          const data = store.readQuery({
            query: getAllPostsQuery
          })
          data.getAllPosts.push(createPost)
          store.writeQuery({ query: getAllPostsQuery, data })
        }
      })
      console.log(response)
      this.props.history.push('/')
    } catch (err) {
      console.log(err)
      //const graphqlError = err.graphQLErrors[0].message
    }
  }

  render() {
    return (
      <Layout style={{ background: '#ECECEC' }}>
        <Navbar currentUser={this.props.currentUser} />
        <Content>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Col span={9}>
            <div>
            <HoveringMenu value={this.state.values.content} />
              <div>
                <button onClick={this.submit}>Post!</button>
              </div>
              </div>
            </Col>
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

const newArticleMutation = gql`
  mutation($content: String!) {
    createPost(content: $content) {
      content
      createdAt
    }
  }
`

export default graphql(newArticleMutation)(NewArticle)