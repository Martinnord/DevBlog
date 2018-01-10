import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import yup from 'yup'
import { Formik, Form } from 'formik'
import { Col, Row, Input, Icon, Button, Alert } from 'antd'
import './index.css'

class Register extends Component {
  render() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required('please enter an email address'),
      username: yup
        .string()
        .matches(/^[a-zA-Z0-9_]*$/, 'please only alphanumeric is allowed')
        .required('please enter an username'),
      password: yup
        .string()
        .min(5, 'password needs to be at least 5 characters long')
        .required('please enter a password')
    })
    return (
      <Formik
        validationSchema={schema}
        initialValues={{
          email: '',
          username: '',
          password: ''
        }}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setSubmitting(true)
          try {
            const response = await this.props.mutate({
              variables: {
                username: values.username,
                email: values.email,
                password: values.password
              }
            })
            const token = response.data.register.jwt
            localStorage.setItem('token', token)
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
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          status
        }) => (
          <div className="container">
            <Form className="login-form">
              <Row>
                <Col span={12} offset={6}>
                  <h1>Register</h1>
                </Col>
              </Row>
              {status && <Alert type="error" message={status} showIcon />}
              <div className="login-input">
                <Row>
                  <Col span={12} offset={6}>
                    <Input
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      prefix={
                        <Icon
                          type="mail"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="text"
                      name="email"
                      label="email"
                      placeholder="Email"
                    />
                    {touched.email &&
                    errors.email && (
                      <p className="error-message">{errors.email}</p>
                    )}
                  </Col>
                </Row>
              </div>
              <div className="login-input">
                <Row>
                  <Col span={12} offset={6}>
                    <Input
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="text"
                      name="username"
                      label="username"
                      placeholder="Username"
                    />
                    {touched.username &&
                    errors.username && (
                      <p className="error-message">{errors.username}</p>
                    )}
                  </Col>
                </Row>
              </div>
              <div className="login-input">
                <Row>
                  <Col span={12} offset={6}>
                    <Input
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="password"
                      name="password"
                      label="password"
                      placeholder="Password"
                    />
                    {touched.password &&
                    errors.password && (
                      <p className="error-message">{errors.password}</p>
                    )}
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
                      Register
                    </Button>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col span={12} offset={6}>
                  Already have an account? <a href="/login">Login here!</a>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      />
    )
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      email
      username
      jwt
    }
  }
`

export default graphql(registerMutation)(Register)
