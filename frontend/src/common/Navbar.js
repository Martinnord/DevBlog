import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon, Button } from 'antd'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class Navbar extends Component {
  render() {
    const { username } = this.props.currentUser || {}
    // console.log(this.props.currentUser.username)

    return (
      <Menu mode="horizontal" style={{ display: 'flex' }}>
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
              <Menu.Item key="setting:1">
                <Link to="/new-article">Write new article</Link>
              </Menu.Item>
              <Menu.Item key="setting:2">Profile</Menu.Item>
              <Menu.Item key="setting:3">Settings</Menu.Item>
              <Menu.Item key="setting:4">Help</Menu.Item>
              <Menu.Item key="setting:5">Sign Out</Menu.Item>
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

export default Navbar
