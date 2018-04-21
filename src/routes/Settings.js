import React, { Component } from 'react'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import { Formik } from 'formik'
import { Layout, Col, Row, Input, Button } from 'antd'
import { CurrentUser } from '../util/auth'
import Navbar from '../common/Navbar'
import '../routes/index.css'

const { Content } = Layout

class Settings extends Component {
  render() {
    const { currentUser, loading } = this.props

    if (loading) {
      return null
    }

    return (
      <Formik
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          let response
          try {
            response = await this.props.updateUserInfo({
              variables: {
                id: currentUser.id,
                email: values.email,
                username: values.username,
                name: values.name,
                profile_image: values.profile_image,
                website_url: values.website_url,
                bio: values.bio,
                location: values.location,
                twitter_username: values.twitter_username,
                github_username: values.github_username,
              },
            })
            const { username } = response.data.updateUserInfo
            this.props.history.push(`/@${username}`)
            // <Alert message="Success Tips" type="success" showIcon />
          } catch (err) {
            console.log(err)
            setSubmitting(false)
          }
        }}
        render={({ isSubmitting, handleChange, handleSubmit }) => (
          <Layout>
            <Navbar />
            <Content>
              <Row>
                <Col span={12} offset={6}>
                  <h1 className="settings-title">
                    Settings for {currentUser.username}
                  </h1>
                </Col>
                <Col span={12} offset={6}>
                  <span>Email</span>
                  <Input
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                    name="email"
                    type="text"
                  />
                </Col>
                <Col span={12} offset={6}>
                  <span>Username</span>
                  <Input
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                    name="username"
                    type="text"
                  />
                </Col>
                <Col span={12} offset={6}>
                  <span>Name</span>
                  <Input
                    defaultValue={currentUser.name}
                    onChange={handleChange}
                    name="name"
                    type="text"
                  />
                </Col>
                <Col span={12} offset={6}>
                  <span>Profile image</span>
                  <Input
                    defaultValue={currentUser.profile_image}
                    onChange={handleChange}
                    name="profile_image"
                    type="text"
                  />
                </Col>
                <Col span={12} offset={6}>
                  <span>Website</span>
                  <Input
                    defaultValue={currentUser.website_url}
                    onChange={handleChange}
                    name="website_url"
                    type="text"
                  />
                </Col>
                <Col span={12} offset={6}>
                  <span>Bio</span>
                  <Input
                    defaultValue={currentUser.bio}
                    onChange={handleChange}
                    name="bio"
                    type="text"
                  />
                </Col>
                <Col span={12} offset={6}>
                  <span>Location</span>
                  <Input
                    defaultValue={currentUser.location}
                    onChange={handleChange}
                    name="location"
                    type="text"
                  />
                </Col>
                <Col span={12} offset={6}>
                  <span>Twitter</span>
                  <Input
                    defaultValue={currentUser.twitter_username}
                    onChange={handleChange}
                    name="twitter_username"
                    type="text"
                  />
                </Col>
                <Col span={12} offset={6}>
                  <span>Github</span>
                  <Input
                    defaultValue={currentUser.github_username}
                    onChange={handleChange}
                    name="github_username"
                    type="text"
                  />
                </Col>
                <Col span={4} offset={10}>
                  <Button
                    className="settings-button"
                    type="primary"
                    htmlType="submit"
                    size="large"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    SUBMIT
                  </Button>
                </Col>
              </Row>
            </Content>
          </Layout>
        )}
      />
    )
  }
}

const updateUserInfoMutation = gql`
  mutation(
    $id: Int!
    $email: String
    $username: String
    $name: String
    $profile_image: String
    $website_url: String
    $bio: String
    $location: String
    $twitter_username: String
    $github_username: String
  ) {
    updateUserInfo(
      id: $id
      email: $email
      username: $username
      profile_image: $profile_image
      website_url: $website_url
      bio: $bio
      location: $location
      name: $name
      twitter_username: $twitter_username
      github_username: $github_username
    ) {
      email
      username
      profile_image
      website_url
      bio
      location
      twitter_username
      github_username
    }
  }
`

const updateUserInfo = graphql(updateUserInfoMutation, {
  name: 'updateUserInfo',
  options: props => {
    return {
      variables: props.id
    }
  }
})

export default compose(updateUserInfo, CurrentUser)(Settings)
