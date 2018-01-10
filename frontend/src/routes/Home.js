import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React, { Component } from 'react'
import { Layout, Menu, Card, Col, Row, Icon } from 'antd'
import moment from 'moment'

const { Content } = Layout
const { Meta } = Card
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class Home extends Component {
  render() {
    const { data: { loading, error, getPosts = [] } } = this.props
    console.log(getPosts)
    if (loading) {
      console.log('loading...')
    }

    const allPosts = getPosts.map(u => (
      <Card
        key={u.id}
        hoverable
        cover={
          <img
            alt="example"
            src="https://www.elegantthemes.com/blog/wp-content/uploads/2017/07/programming-languages-to-learn-for-wordpress-featured-image.png"
          />
        }
      >
        <Meta title={u.title} description={u.content} />
        {/*<p>{moment(u.created_at).format('HH:mm D/MM')}</p>*/}
      </Card>
    ))

    return (
      <Layout style={{ background: '#ECECEC' }}>
        <Menu mode="horizontal" style={{ display: 'flex' }}>
          <Menu.Item style={{ flex: '1' }}>DEVBLOG</Menu.Item>
          <SubMenu
            title={
              <span>
                <Icon type="user" />Martin Nordström
              </span>
            }
          >
            <MenuItemGroup>
              <Menu.Item key="setting:1">Write new article</Menu.Item>
              {/* TODO: Have a hr tag of some sort here */}
              <Menu.Item key="setting:2">Profile</Menu.Item>
              <Menu.Item key="setting:3">Settings</Menu.Item>
              <Menu.Item key="setting:4">Help</Menu.Item>
              <Menu.Item key="setting:5">Sign Out</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
        <Content>
          <Row
            gutter={16}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Col span={8}>{allPosts}</Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

const getPostsQuery = gql`
  query getPostsQuery {
    getPosts {
      id
      title
      content
    }
  }
`

export default graphql(getPostsQuery)(Home)
