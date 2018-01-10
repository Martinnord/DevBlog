import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class Navbar extends Component {
  render() {
    return (
      <Menu mode="horizontal" style={{ display: 'flex' }}>
        <Menu.Item style={{ alignSelf: 'flex-start' }}><Link to="/home">DEVBLOG</Link></Menu.Item>
        <SubMenu
          style={{ alignSelf: 'flex-end' }}
          title={
            <span>
              <Icon type="user" />Martin Nordström
            </span>
          }
        >
          <MenuItemGroup>
            <Menu.Item key="setting:1"><Link to="/new-article">Write new article</Link></Menu.Item>
            {/* TODO: Have a hr tag of some sort here */}
            <Menu.Item key="setting:2">Profile</Menu.Item>
            <Menu.Item key="setting:3">Settings</Menu.Item>
            <Menu.Item key="setting:4">Help</Menu.Item>
            <Menu.Item key="setting:5">Sign Out</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    )
  }
}

export default Navbar
