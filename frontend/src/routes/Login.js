import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import yup from 'yup'
import { Formik, Form } from 'formik'
import { Col, Row, Input, Icon, Button, Alert } from 'antd'
import { meQuery } from '../graphql/login'
import client from '../client'
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
          password: '',
        }}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setSubmitting(true)
          try {
            const response = await this.props.mutate({
              variables: {
                email: values.email,
                password: values.password,
              },
              // update: (store, { data: { login } }) => {
              // //   console.log('login', login)
              //   const data = client.query({ meQuery })

              //   client.writeQuery({
              //     meQuery,
              //     data: {
              //       meQuery: [...data.meQuery, login],
              //     },
              //   })
              //   console.log('data', data)
              //   // data.currentUser.push(login)
              //   // store.writeQuery({ query: meQuery, data })
              // },
            })
            const test = await client.query({ query: meQuery })
            console.log(test)
            
            const token = response.data.login.jwt
            localStorage.setItem('token', token)
            this.props.history.push('/')
          } catch (err) {
            console.log(err)
            // const graphqlError = err.graphQLErrors[0].message
            // setStatus(graphqlError)
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
          status,
        }) => (
          <div className="container">
            <Form className="login-form">
              <Row>
                <Col span={12} offset={6}>
                  <h1>Login</h1>
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
                  Don't have an account? <a href="/register">Register here!</a>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      />
    )
  }
}

export const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      username
      jwt
    }
  }
`

export default graphql(loginMutation)(Login)
