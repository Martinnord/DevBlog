import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import yup from 'yup'
import { Formik, Form } from 'formik'
import { Col, Row, Input, Icon, Button } from 'antd'
import './index.css'

class Login extends Component {
  render() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required('please enter an email address')
    })
    return (
      <Formik
        validationSchema={schema}
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={async (values, { setSubmitting, setErrors }, actions) => {
          setSubmitting(true)
          await this.props.mutate({
            variables: {
              email: values.email,
              password: values.password
            }
          })
        }}
        render={({
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <div className="container">
            <Form className="login-form">
              <Row>
                <Col span={12} offset={6}>
                  <h1>Login</h1>
                </Col>
              </Row>
              <div className="login-input">
                <Row>
                  <Col span={12} offset={6}>
                    <Input
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      Login
                    </Button>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col span={12} offset={6}>
                  Don't have an account? <a href="/login">Register here!</a>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      />
    )
  }
}

const loginMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`

export default graphql(loginMutation)(Login)
