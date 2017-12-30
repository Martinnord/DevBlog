import React, { Component } from 'react'
import gql from 'graphql-tag'
import yup from 'yup'
import { graphql } from 'react-apollo'
import { Container, Header, Input, Button } from 'semantic-ui-react'
import { Formik, Form, Field } from 'formik'

class Register extends Component {
  render() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required('Please enter an email address'),
      username: yup.string().required('Please enter an username'),
      password: yup
        .string()
        .min(5, 'Password needs to be at least 5 characters long')
        .required('Please enter a password')
    })
    return (
      <Container text>
        <Formik
          validationSchema={schema}
          initialValues={{
            email: '',
            username: '',
            password: ''
          }}
          onSubmit={async (values, { setSubmitting, setErrors }, actions) => {
            setSubmitting(true)
            await this.props.mutate({
              variables: {
                username: values.username,
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
            <Form>
              <div>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="email"
                  label="email"
                  placeholder="Email"
                />
              </div>
              <div>
                {touched.username &&
                  errors.username && <p>{errors.username}</p>}
                <Field
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="username"
                  label="username"
                  placeholder="Username"
                />
              </div>
              <div>
                {touched.password &&
                  errors.password && <p>{errors.password}</p>}
                <Field
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  name="password"
                  label="password"
                  placeholder="Password"
                />
              </div>
              <Button type="submit" disabled={isSubmitting || !dirty}>
                Register
              </Button>
            </Form>
          )}
        />
      </Container>
    )
  }
}

const registerMutation = gql`
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

export default graphql(registerMutation)(Register)
