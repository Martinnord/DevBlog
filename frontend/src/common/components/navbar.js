import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'
import '../../styles/css/navbar.css'

class MainNavbar extends Component {
  state = { activeItem_: 'feed' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const { user } = this.props
    return (
      <Segment className="whole-navbar">
        <Menu pointing secondary>
          <Menu.Item name='feed' active={activeItem === 'feed'} onClick={this.handleItemClick}>
            <Link to="/">
               Feed
            </Link>
          </Menu.Item>
          <Menu.Item name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}>
            <Link to="/profile">
             {user.name}
            </Link>
          </Menu.Item>
          <Menu.Item name='create post' active={activeItem === 'create post'} onClick={this.handleItemClick}>
            <Link to="/create">
               Write
            </Link>
          </Menu.Item>
        </Menu>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.setCurrentUser.user
  }
}


export default connect(mapStateToProps)(MainNavbar)