import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React, { Component } from 'react'
import { Layout, Card, Col, Row } from 'antd'
import moment from 'moment'
import Navbar from '../common/Navbar'

const { Content } = Layout
const { Meta } = Card

class NewArticle extends Component {
  render() {
    // const { data: { loading, error, getPosts = [] } } = this.props

    return (
      <Layout style={{ background: '#ECECEC' }}>
        <Navbar />
        <Content>
          <Row
            gutter={16}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Col span={8}><h1>Hejsan</h1></Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default NewArticle
