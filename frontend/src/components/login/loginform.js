import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'
import "../../styles/css/auth.css"


class LoginForm extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h1 className="auth-title">You like it old-school, huh?</h1>
		 	 <form className="login-form" onSubmit={this.props.handleSubmit}>
        <div>
          <Field
            className="login-input"
            placeholder="Email"
            name="email"
            component="input"
            type="text"
          />
        </div>

        <div>
          <Field
            className="login-input"
            placeholder="Lösenord"
            name="password"
            component="input"
            type="password"
          />
        </div>

        <Button className="login-btn" type="submit">
          Login
        </Button>
      </form>		
      <a onClick={this.props.toggleLoginForm}>Go back</a>		
      </div>
    )
  }
}

export default reduxForm({
	form: 'login'
})(connect()(LoginForm))
