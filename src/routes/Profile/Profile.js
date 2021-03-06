import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { Layout, Spin, Icon } from 'antd'
import { Helmet } from 'react-helmet'
import PostCard from '../../components/Postcard'
import Navbar from '../../common/Navbar'
import GET_USER_QUERY from '../../graphql/queries/getUser'
import '../index.css'

const { Content } = Layout

class Profile extends Component {
  render() {
    const {
      data: { loading, getUser }
    } = this.props

    if (loading) {
      return <Spin size="large" />
    }

    if (!loading && !getUser) {
      return <Redirect to={{ pathname: '/404' }} />
    }

    return (
      <div>
        <Navbar />
        <Helmet>
          <title>{getUser.name || getUser.username} | Dvlprblog Profile</title>
        </Helmet>
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
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: { username: props.match.params.username }
  })
})(Profile)
