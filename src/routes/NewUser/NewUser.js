import React, { Component } from 'react'
import { Layout, Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'
import Navbar from '../../common/Navbar'
import FooterComponent from '../../common/Footer'

const { Content } = Layout
class NewUser extends Component {
  render() {
    return (
      <Layout style={{ backgroundColor: '#f9f9fa' }}>
        <Navbar />
        <Content style={{ marginTop: '5%' }}>
          <Row>
            <Col span={12} offset={6}>
              <h1
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '3em'
                }}
              >
                Sign in or create an account first!
              </h1>
            </Col>
          </Row>
          <Row className="auth-wrapper">
            <Col span={12} offset={6}>
              <Link to="/register" className="test">
                <Button className="auth-link" size="large">
                  Create an account
                </Button>
              </Link>
              <Link to="/login" className="test">
                <Button className="auth-link" size="large">
                  Log in
                </Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col span={12} offset={6}>
              <h3 className="introduction">
                Devblog is a great community for people who are interested in
                code or people who want's to get into it
              </h3>
            </Col>
          </Row>
          <FooterComponent />
        </Content>
      </Layout>
    )
  }
}

export default NewUser
