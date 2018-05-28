import React from 'react'
import { Layout, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Navbar from '../../common/Navbar'
import FooterComponent from '../../common/Footer'

const { Content } = Layout

const Contact = () => {
  return (
    <Layout>
      <Helmet>
        <title>Contact Dvlprblog</title>
      </Helmet>
      <Navbar />
      <Content>
        <Row className="page-info-row">
          <Col>
            <div className="page-info-card">
              <h1 className="page-info-title">Contact</h1>
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
                  <Link target="_blank" to="https://www.instagram.com/Dvlprblog/">
                    <p className="post-content">@dvlprblog</p>
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
