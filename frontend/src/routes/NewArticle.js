import React, { Component } from 'react'
import gql from 'graphql-tag'
import yup from 'yup'
import { graphql } from 'react-apollo'
import { Layout, Col, Row, Input, Button } from 'antd'
import { Formik, Form } from 'formik'
import Navbar from '../common/Navbar'
import { getAllPostsQuery } from '../graphql/newArticle'
import { Value } from 'slate'
import HoveringMenu from '../components/HoveringMenu'
import './index.css'

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
                text: ''
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
    content: initialValue
  }

  updateValue = values => {
    console.log('updatevalues', values)
    this.setState({
      content: values
    })
  }

  render() {
    const schema = yup.object().shape({
      title: yup.string().required('Please include a title')
    })

    return (
      <Layout style={{ background: '#ECECEC' }}>
        <Navbar currentUser={this.props.currentUser} />
        <Content>
          <Row>
            <Col span={12} offset={6}>
              <Formik
                validationSchema={schema}
                initialValues={{
                  title: '',
                  content: initialValue,
                  imageUrl: ''
                }}
                onSubmit={async (values, { setSubmitting, setStatus }) => {
                  setSubmitting(true)
                  const { content } = this.state
                  try {
                    await this.props.mutate({
                      variables: {
                        title: values.title,
                        content: JSON.stringify(content.toJSON()),
                        imageUrl: values.imageUrl
                      },
                      update: (store, { data: { createPost } }) => {
                        const data = store.readQuery({
                          query: getAllPostsQuery
                        })
                        data.getAllPosts.push(createPost)
                        store.writeQuery({ query: getAllPostsQuery, data })
                      }
                    })
                    this.props.history.push('/')
                  } catch (err) {
                    const graphqlError = err.graphQLErrors[0].message
                    setStatus(graphqlError)
                    setSubmitting(false)
                  }
                }}
                render={({
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  status
                }) => (
                  <Form>
                    {touched.title &&
                      errors.title && (
                        <p className="error-message">{errors.title}</p>
                      )}
                    <Input
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="title"
                      label="title"
                      placeholder="Title"
                    />
                    <Input
                      value={values.imageUrl}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="imageUrl"
                      label="imageUrl"
                      placeholder="Article cover"
                    />

                    <HoveringMenu
                      value={this.state.content}
                      updateValue={this.updateValue}
                    />
                    <Row>
                      <Col span={9} offset={12}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={isSubmitting}
                          onClick={handleSubmit}
                        >
                          Publish Article
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              />
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
  mutation($title: String!, $content: String!, $imageUrl: String) {
    createPost(title: $title, content: $content, imageUrl: $imageUrl) {
      title
      content
      createdAt
      imageUrl
    }
  }
`

export default graphql(newArticleMutation)(NewArticle)
