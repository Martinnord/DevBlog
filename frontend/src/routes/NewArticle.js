import React, { Component } from 'react'
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
import Editor from 'draft-js-plugins-editor'
import 'draft-js-emoji-plugin/lib/plugin.css'
import debounce from 'lodash/debounce';


const emojiPlugin = createEmojiPlugin()

const { EmojiSuggestions } = emojiPlugin

const { TextArea } = Input
const { Content } = Layout

class NewArticle extends Component {
  constructor() {
    super()
    this.state = {
      editorState: EditorState.createEmpty(),
      values: {
        content: ''
      }
    }
  }

  onChange = editorState => {
    const contentState = editorState.getCurrentContent()
    // console.log('content state', convertToRaw(contentState))
    this.setState({ editorState })
  }

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)

    if (newState) {
      this.onChange(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE')
    )
  }

  onToggleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState))
  }
  
  submit = async () => {
    const contentState = this.state.editorState.getCurrentContent()

    const { content } = this.state.values
    console.log('raw', convertToRaw(contentState))
    console.log('json', JSON.stringify(contentState))

    //console.log('hello', convertToRaw(this.state.contentState))
    let response;
    try {
      response = await this.props.mutate({
        variables: {
          content: JSON.stringify(contentState)
        },
        // update: (store, { data: { createPost } }) => {
        //   const data = store.readQuery({
        //     query: getAllPostsQuery
        //   })
        //   data.getAllPosts.push(createPost)
        //   store.writeQuery({ query: getAllPostsQuery, data })
        // }
      })
      console.log(response)
      this.props.history.push('/')
    } catch (err) {
      console.log(err)
      //const graphqlError = err.graphQLErrors[0].message
    }
  }

  render() {
    // const schema = yup.object().shape({
    //   content: yup.string().required('Please include some content')
    // })

    return (
      <Layout style={{ background: '#ECECEC' }}>
        <Navbar currentUser={this.props.currentUser} />
        <Content>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Col span={9}>
              <div>
                <button onClick={this.onUnderlineClick}>Underline</button>
                <button onClick={this.onToggleCode}>Code Block</button>
                <Editor
                  editorState={this.state.editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  onChange={this.onChange}
                  plugins={[emojiPlugin]}
                  value={this.props.value}
                />
                <EmojiSuggestions />
                <button onClick={this.submit}>Post!</button>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
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
