import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { Layout, Col, Row, Spin, Icon } from 'antd'
import PostCard from '../components/Postcard'
import Navbar from '../common/Navbar'
import GET_USER_QUERY from '../graphql/queries/getUser'
import './index.css'

const { Content } = Layout

class Profile extends Component {
  render() {
    const { loading, getUser } = this.props.data

    if (loading) {
      return <Spin size="large" />
    }

    console.log(loading)
    console.log(getUser)

    //debugger
    // if (!loading && !getUser) {
    //   return <Redirect to={{ pathname: '/404' }} />
    // }

    return (
      <div>
        <Navbar />
        <Content>
          <div className="profile-info-wrapper">
            {getUser.profile_image ? (
              <img
                className="profile-image"
                src={getUser.profile_image}
                alt={getUser.profile_image}
              />
            ) : null}
            <div className="profile-details">
              <h1 className="profile-name">
                {`${getUser.name ? getUser.name : getUser.username}`}{' '}
              </h1>
              <p className="profile-bio">{getUser.bio}</p>
              <Link
                target="_blank"
                to={`https://twitter.com/${getUser.twitter_username}`}
              >
                <Icon className="profile-social-icon" type="twitter" />
              </Link>
              <Link
                target="_blank"
                to={`https://github.com/${getUser.github_username}`}
              >
                <Icon className="profile-social-icon" type="github" />
              </Link>
            </div>
          </div>
          <PostCard posts={getUser.posts} />
        </Content>
      </div>
    )
  }
}

export default graphql(GET_USER_QUERY, {
  skip: props => !props.match.params.username,
  options: props => ({
    variables: { username: props.match.params.username }
  })
})(Profile)
