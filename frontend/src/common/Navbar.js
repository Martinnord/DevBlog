import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon, Button } from 'antd'
import { CurrentUser } from '../util/auth'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class Navbar extends Component {
  render() {
    if (this.props.loading) {
      return null
    }

    const { username } = this.props.currentUser

    const onClick = ({ key }) => {
      if (key === '5') {
        localStorage.removeItem('token')
        window.location.reload()
      }
    }

    return (
      <Menu mode="horizontal" style={{ display: 'flex' }} onClick={onClick}>
        <Menu.Item style={{ alignSelf: 'flex-start' }}>
          <Link to="/">DEVBLOG</Link>
        </Menu.Item>
        {username ? (
          <SubMenu
            style={{ alignSelf: 'flex-end' }}
            title={
              <span>
                <Icon type="user" />
                {username}
              </span>
            }
          >
            <MenuItemGroup>
              <Menu.Item key="1">
                <Link to="/new-article">Write new article</Link>
              </Menu.Item>
              <Menu.Item key="2">Profile</Menu.Item>
              <Menu.Item key="3">Settings</Menu.Item>
              <Menu.Item key="4">Help</Menu.Item>
              <Menu.Item key="5">Sign Out</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        ) : (
          <MenuItemGroup>
            <Menu.Item>
              <Button>
                <Link to="/login">Login!</Link>
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button>
                <Link to="/register">Sign up!</Link>
              </Button>
            </Menu.Item>
          </MenuItemGroup>
        )}
      </Menu>
    )
  }
}

export default CurrentUser(Navbar)
