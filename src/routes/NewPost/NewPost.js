import React, { Component } from 'react'
import yup from 'yup'
import { graphql } from 'react-apollo'
import { Col, Row, Input, Button } from 'antd'
import { Formik, Form } from 'formik'
import { Value } from 'slate'
import { CurrentUser } from '../../util/auth'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Navbar from '../../common/Navbar'
import HoveringMenu from '../../components/HoveringMenu'
import NEW_POST_MUTATION from '../../graphql/mutations/newPost'
import GET_ALL_POSTS_QUERY from '../../graphql/queries/getAllPosts'
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

class NewPost extends Component {
  state = {
    content: initialValue
  }

  updateValue = values => {
    this.setState({
      content: values
    })
  }

  render() {
    const schema = yup.object().shape({
      title: yup.string().required('Please include a title')
    })

    const { loading, currentUser } = this.props

    if (loading) return true

    if (!currentUser) {
      return <Redirect to={{ pathname: '/new' }} />
    }

    document.body.style.backgroundColor = '#FFF'

    return (
      <div>
        <div className="new-post-layout">
          <Helmet>
            <title>New Article</title>
          </Helmet>
          <Row className="new-post-row">
            <Formik
              validationSchema={schema}
              initialValues={{
                title: '',
                content: initialValue,
                image_url: ''
              }}
              onSubmit={async (values, { setSubmitting, setStatus }) => {
                setSubmitting(true)
                const { content } = this.state
                try {
                  await this.props.mutate({
                    variables: {
                      title: values.title,
                      content: JSON.stringify(content.toJSON()),
                      image_url: values.image_url
                    },
                    update: (store, { data: { createPost } }) => {
                      const data = store.readQuery({
                        query: GET_ALL_POSTS_QUERY
                      })
                      data.getAllPosts.push(createPost)
                      store.writeQuery({
                        query: GET_ALL_POSTS_QUERY,
                        data
                      })
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
                <div>
                  <Navbar
                    path={this.props.match.path}
                    handleSubmit={handleSubmit}
                  />
                  <Col span={12} offset={6}>
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
                        value={this.state.content}
                        updateValue={this.updateValue}
                      />
                    </Form>
                  </Col>
                </div>
              )}
            />
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
        return (
          <div style={{ backgroundColor: '#FF0000' }}>
            <code>{children}</code>
          </div>
        )
      case 'italic':
        return <em>{children}</em>
      case 'underlined':
        return <u>{children}</u>
    }
  }
}

export default CurrentUser(graphql(NEW_POST_MUTATION)(NewPost))
