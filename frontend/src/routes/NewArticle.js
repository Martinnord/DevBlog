import React, { Component } from 'react'
import gql from 'graphql-tag'
import yup from 'yup'
import { graphql } from 'react-apollo'
import { Layout, Card, Col, Row, Input, Button, Alert } from 'antd'
import { Formik, Form } from 'formik'
import Navbar from '../common/Navbar'
import { getAllPostsQuery } from '../graphql/newArticle'

const { TextArea } = Input
const { Content } = Layout
const { Meta } = Card

class NewArticle extends Component {
  render() {
    const schema = yup.object().shape({
      title: yup.string().required('Please include a title'),
      content: yup.string().required('Please include some content')
    })

    return (
      <Layout style={{ background: '#ECECEC' }}>
        <Navbar currentUser={this.props.currentUser} />
        <Content>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Col span={9}>
              <Formik
                validationSchema={schema}
                initialValues={{
                  title: '',
                  content: '',
                  imageUrl: ''
                }}
                onSubmit={async (values, { setSubmitting, setStatus }) => {
                  setSubmitting(true)
                  try {
                    await this.props.mutate({
                      variables: {
                        title: values.title,
                        content: values.content,
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
                    <Row>
                      <Col span={12} offset={9}>
                        <h1>Create a new article</h1>
                      </Col>
                    </Row>
                    {status && <Alert type="error" message={status} showIcon />}
                    <div className="login-input">
                      <Row>
                        <Col span={12} offset={9}>
                          <Input
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            name="title"
                            label="title"
                            placeholder="Title"
                          />

                          {touched.title &&
                            errors.title && (
                              <p className="error-message">{errors.title}</p>
                            )}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12} offset={9}>
                          <Input
                            value={values.imageUrl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            name="imageUrl"
                            label="imageUrl"
                            placeholder="URL to the image"
                          />

                          {touched.title &&
                            errors.title && (
                              <p className="error-message">{errors.title}</p>
                            )}
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row>
                        <Col span={12} offset={9}>
                          <TextArea
                            row={10}
                            value={values.content}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="content"
                            name="content"
                            label="content"
                            placeholder="content"
                          />
                          {touched.content &&
                            errors.content && (
                              <p className="error-message">{errors.content}</p>
                            )}
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row>
                        <Col span={12} offset={9}>
                          <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                          >
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                )}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    )
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
