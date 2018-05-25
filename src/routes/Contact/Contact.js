import React from 'react'
import { Layout, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import Navbar from '../../common/Navbar'
import FooterComponent from '../../common/Footer'

const { Content } = Layout

const Contact = () => {
  return (
    <Layout>
      <Navbar />
      <Content>
        <Row className="about-row">
          <Col>
            <div className="about-card">
              <h1 className="about-title">Contact</h1>
              <div>
                <p className="post-content">
                  We'd love to hear from you! Shoot us an email or contact us on
                  any of out social media accounts!
                </p>
                <address className="post-content">
                  Email:{' '}
                  <a href="mailto:martin.nordstrom99@gmail.com">
                    martin.nordstrom99@gmail.com
                  </a>
                </address>
                <div style={{ display: 'flex' }}>
                  <p className="post-content" style={{ marginRight: '2px' }}>
                    Instagram:
                  </p>
                  <Link target="_blank" to="https://www.instagram.com/devblog/">
                    <p className="post-content">@devblog</p>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
      <FooterComponent />
    </Layout>
  )
}

export default Contact
