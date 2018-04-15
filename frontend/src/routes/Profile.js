import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Layout, Col, Row, Spin, Icon } from 'antd'
import PostCard from '../components/Postcard'
import Navbar from '../common/Navbar'
import './index.css'

const { Content } = Layout

const Profile = ({ data }) => {
  const { loading, getUser } = data

  if (loading) {
    return <Spin size="large" />
  }

  if (!loading && !getUser) {
    return <Redirect to={{ pathname: '/404' }} />
  }

  return (
    <Layout style={{ background: '#ECECEC' }}>
      <Navbar />
      <Content>
        <Row>
          <Col span={12} offset={6}>
            <div className="profile-info-wrapper">
              <div className="image-cropper">
                {getUser.profile_image ? (
                  <img
                    className="profile-image"
                    src={getUser.profile_image}
                    alt={getUser.profile_image}
                  />
                ) : null}
              </div>
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
          </Col>
          {/* <Col span={12} offset={6}>
            <p className="profile-bio">{getUser.bio}</p>
          </Col> */}
          {/* <Col span={12} offset={6}>
            <Link to={`https://twitter.com/${getUser.twitterUsername}`}>{getUser.twitterUsername}<Icon type="twitter" /></Link>
            <Link to={`https://github.com/${getUser.githubUsername}`}>{getUser.githubUsername}<Icon type="github" /></Link>
          </Col> */}
          <PostCard posts={getUser.posts} />
        </Row>
      </Content>
    </Layout>
  )
}

const getUserQuery = gql`
  query($username: String!) {
    getUser(username: $username) {
      name
      username
      profile_image
      bio
      twitter_username
      github_username
      posts {
        id
        title
        content
        image_url
        created_at
        user {
          username
        }
      }
    }
  }
`

export default graphql(getUserQuery, {
  skip: props => !props.match.params.username,
  options: props => ({
    variables: { username: props.match.params.username }
  })
})(Profile)
