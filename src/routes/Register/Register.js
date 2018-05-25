import React, { Component } from 'react'
import { compose } from 'react-apollo'
import { registerSchema } from '../../util/auth-validation'
import { Formik, Form } from 'formik'
import { Col, Row, Input, Icon, Button, Alert } from 'antd'
import { RegisterMutation } from '../../util/auth'
import '../index.css'

class Register extends Component {
  state = {
    type: 'password'
  }

  showPassword = e => {
    e.preventDefault()
    this.setState({
      type: this.state.type === 'password' ? 'input' : 'password'
    })
  }

  render() {
    return (
      <Formik
        validationSchema={registerSchema}
        initialValues={{
          email: '',
          username: '',
          password: ''
        }}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setSubmitting(true)
          try {
            await this.props.register(
              values.email,
              values.username,
              values.password
            )
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
                      type={this.state.type}
                      name="password"
                      label="password"
                      placeholder="Password"
                    />
                    <span onClick={this.showPassword}>
                      {this.state.type === 'input' ? 'Hide' : 'Show'}
                    </span>
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

export default compose(RegisterMutation)(Register)
