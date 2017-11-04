import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Button, Icon } from "semantic-ui-react"
import "../../styles/css/auth.css"

class LoginOptions extends Component {
  render() {
    return (
      <div>
        <h1 className="auth-title">Welcome back</h1>
        <h2 className="auth-subtitle">
          Login to keep learning about stuff we know you love!
        </h2>
        <div className="login-options ui-list">
          <div className="list">
            <Button className="option" color="facebook">
              <Icon name="facebook" /> Login with Facebook
            </Button>
          </div>
          <div className="list">
            <Button className="option" onClick={this.props.toggleLoginForm}>
              <Icon name="mail" /> Login with email
            </Button>
          </div>
        </div>
        <h2 className="auth-subtitle">New to Devblog? Create an account!</h2>
      </div>
    )
  }
}

export default connect()(LoginOptions);
