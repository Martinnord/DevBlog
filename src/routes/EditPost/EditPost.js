import React, { Component } from 'react'
import yup from 'yup'
import { graphql, compose } from 'react-apollo'
import { Col, Row, Input, Button } from 'antd'
import { Redirect } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Value } from 'slate'
import { Helmet } from 'react-helmet'
import Navbar from '../../common/Navbar'
import HoveringMenu from '../../components/HoveringMenu'
import { CurrentUser } from '../../util/auth'
import UPDATE_POST_MUTATION from '../../graphql/mutations/updatePost'
import GET_POST_QUERY from '../../graphql/queries/getPost'
import '../index.css'

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

class EditPost extends Component {
  state = {
    content: initialValue
  }

  updateValue = values => {
    this.setState({
      content: values
    })
  }

  render() {
    const {
      data: { loading, getPost },
      currentUser
    } = this.props

    if (loading) {
      return null
    }

    if (!currentUser || currentUser.id !== getPost.user.id) {
      return <Redirect to="/new" />
    }

    if (!loading && !getPost) {
      return <Redirect to="/404" />
    }

    const schema = yup.object().shape({
      title: yup.string().required('Please include a title')
    })

    const contentObj = JSON.parse(getPost.content)
    const parsedContent = Value.fromJSON(contentObj)

    return (
      <div>
        <Navbar />
        <div className="new-post-layout">
          <Helmet>
            <title>Edit {getPost.title}</title>
          </Helmet>
          <Row className="new-post-row">
            <Col span={12} offset={6}>
              <Formik
                validationSchema={schema}
                initialValues={{
                  title: getPost.title,
                  content: getPost.content,
                  image_url: getPost.image_url
                }}
                onSubmit={async (values, { setSubmitting, setStatus }) => {
                  setSubmitting(true)
                  const { content } = this.state
                  try {
                    await this.props.mutate({
                      variables: {
                        id: getPost.id,
                        title: values.title,
                        content: JSON.stringify(content.toJSON()),
                        image_url: values.image_url
                      }
                    })
                    this.props.history.push('/')
                  } catch (err) {
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
                  <Form className="new-article-form">
                    <Input
                      className="new-article-input new-article-title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="title"
                      label="title"
                      placeholder="Title"
                    />
                    <Input
                      className="new-article-input new-article-image-url"
                      value={values.image_url}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="image_url"
                      label="image_url"
                      placeholder="Image cover (only accept link atm)"
                    />
                    <HoveringMenu
                      className="new-post-editor"
                      value={parsedContent}
                      updateValue={this.updateValue}
                    />
                    <Row>
                      <Col span={6} offset={6}>
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
        </div>
      </div>
    )
  }
  renderMark = props => {
    const { children, mark } = props
    switch (mark.type) {
      case 'title':
        return <h3>{children}</h3>
      case 'sub.title':
        return <h4>{children}</h4>
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

export default compose(
  CurrentUser,
  graphql(GET_POST_QUERY, {
    skip: props => !props.match.params.id,
    options: props => ({
      variables: { id: props.match.params.id }
    })
  }),
  graphql(UPDATE_POST_MUTATION, {
    skip: props => props.match.params.id,
    options: props => ({
      variables: { id: props.match.params.id }
    })
  })
)(EditPost)
