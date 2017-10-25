import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, MenuItem, DropdownButton } from 'react-bootstrap'
import './navbar.css'

export default class MainNavbar extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={2} className="dropdown-navbar">
              {/* <Link to="/createpost">Skapa Post</Link> */}
              <p>FUCK OFF</p>
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={2}>
              <i
                className="fa fa-user"
                aria-hidden="true"
                style={{ marginRight: '3px', color: '#fff' }}
              />
              <DropdownButton
                style={{ backgroundColor: '#006E78' }}
                className="dropdown-navbar"
                title="Martin Nordström"
                id="bg-nested-dropdown"
              >
                <MenuItem className="dropdown-menu-item" eventKey="1">
                  <Link to="/profile" style={{ color: '#006e78' }}>
                    Profil
                  </Link>
                </MenuItem>
                <hr className="hr-navbar" />
                <MenuItem className="dropdown-menu-item" eventKey="3">
                  Logga ut
                </MenuItem>
              </DropdownButton>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
