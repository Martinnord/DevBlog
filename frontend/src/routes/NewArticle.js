import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Layout, Card, Col, Row, Input, Button, Alert } from 'antd'
import Navbar from '../common/Navbar'
import { Formik, Form } from 'formik'

const { TextArea } = Input

const { Content } = Layout
const { Meta } = Card

class NewArticle extends Component {
  render() {
    console.log(this.props.me)
    // const { data: { loading, error, getPosts = [] } } = this.props

    return (
      <Layout style={{ background: '#ECECEC' }}>
        <Navbar />
        <Content>
          <Row
            gutter={16}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Col span={8}>
              <Formik
                initialValues={{
                  title: '',
                  content: ''
                }}
                onSubmit={async (values, { setSubmitting, setStatus }) => {
                  setSubmitting(true)
                  try {
                    const response = await this.props.mutate({
                      variables: {
                        title: values.title,
                        content: values.content
                      }
                    })
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
                  status
                }) => (
                  <div className="container">
                    <Form className="login-form">
                      <Row>
                        <Col span={12} offset={6}>
                          <h1>Create a new article</h1>
                        </Col>
                      </Row>
                      {status && (
                        <Alert type="error" message={status} showIcon />
                      )}
                      <div className="login-input">
                        <Row>
                          <Col span={12} offset={6}>
                            <Input
                              value={values.title}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              name="title"
                              label="title"
                              placeholder="Title"
                            />

                            {/*{touched.email &&
                            errors.email && (
                              <p className="error-message">{errors.email}</p>
                            )}*/}
                          </Col>
                        </Row>
                      </div>
                      <div className="login-input">
                        <Row>
                          <Col span={12} offset={6}>
                            <Input
                              value={values.content}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="content"
                              name="content"
                              label="content"
                              placeholder="content"
                            />
                          </Col>
                        </Row>
                      </div>
                      <div className="login-input">
                        <Row>
                          <Col span={12} offset={6}>
                            <Button
                              className="login-form-btn"
                              type="primary"
                              htmlType="submit"
                              disabled={isSubmitting}
                            >
                              Submit
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </div>
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
  mutation($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      title
      content
      createdAt
    }
  }
`

export default graphql(newArticleMutation)(NewArticle)
