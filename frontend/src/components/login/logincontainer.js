import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'
import LoginForm from './loginform'
import LoginOptions from './loginoptions'
import '../../styles/css/auth.css'

class LoginContainer extends Component {
	constructor(props) {
		super(props)
		this.state = { show: false }
	}

	toggleLoginForm = () => {
		const { show } = this.state
		this.setState({ show: !show })
	}

  submit(values) {
		console.log(values)
	}

	render() {
		const { show } = this.state
		if(show) {
			return (
				<Container className="login-container">
					<LoginForm toggleLoginForm={this.toggleLoginForm.bind(this)}/>
				</Container>
			)
		} else {
			return (
				<Container className="login-container">
					<LoginOptions toggleLoginForm={this.toggleLoginForm.bind(this)}/>
				</Container>
			)
		}
	}
}

export default connect()(LoginContainer)
