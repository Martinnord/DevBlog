import React from 'react'
import { Layout, Row, Col } from 'antd'
import Navbar from '../common/Navbar'
import FooterComponent from '../common/Footer'

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
                <address className="post-content">
                  Email:{' '}
                  <a href="mailto:martin.nordstrom99@gmail.com">
                    martin.nordstrom99@gmail.com
                  </a>
                </address>
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
