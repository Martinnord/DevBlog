import React from 'react'
import { Layout, Row, Col } from 'antd'
import Navbar from '../../common/Navbar'
import FooterComponent from '../../common/Footer'

const { Content } = Layout

const About = () => {
  return (
    <Layout>
      <Navbar />
      <Content>
        <Row className="about-row">
          <Col>
            <div className="about-card">
              <h1 className="about-title">About Dvlprblog</h1>
              <div>
                <p className="post-content">
                  Dvlprblog main goal is to let developers share their knowledge
                  to others. Dvlprblog is for anyone and anyone can write their
                  own articles. We hope that you find this platform as a great
                  place to grow as a developer.
                  <br />
                  <br />
                  Keep on hacking!
                </p>
              </div>
            </div>
            <div className="about-card">
              <h1 className="about-title">The Crew</h1>
              <div style={{ display: 'flex' }}>
                <img
                  className="profile-image"
                  src="https://scontent.farn1-1.fna.fbcdn.net/v/t1.0-9/31086776_1025682474247185_6097003365718294528_n.jpg?_nc_cat=0&oh=fd62406438d07a2384738fb19d481220&oe=5B951407"
                  alt="Martin Nordström"
                />
                <div className="profile-details">
                  <h1 className="about-title">Martin Nordström</h1>
                  <p className="post-content">
                    Martin Nordström is the founder and creator of Dvlprblog. He
                    started Devblog in early 2018 and coded the website from
                    scratch in his bedroom. He is currently the head of the
                    development team.
                  </p>
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

export default About
