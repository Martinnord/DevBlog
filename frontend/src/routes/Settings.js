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
          let response;
          try {
            response = await this.props.updateUserInfo({
              variables: {
                id: currentUser.id,
                email: values.email,
                username: values.username,
                name: values.name,
                profileImage: values.profileImage,
                websiteUrl: values.websiteUrl,
                bio: values.bio,
                location: values.location,
                education: values.education,
                twitterUsername: values.twitterUsername,
                githubUsername: values.githubUsername,
              },
            })
            console.log(response)
            alert('Success!')
            //<Alert message="Success Tips" type="success" showIcon />
          } catch (err) {
            setSubmitting(false)
          }
        }}
        render={({ isSubmitting, handleChange, handleSubmit }) => (
          <Layout>
            <Navbar />
            <Content>
              <Row>
                <Col span={12} offset={6}>
                  <h1 className="settings-title">Settings for {currentUser.username}</h1>
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
                    defaultValue={currentUser.profileImage}
                    onChange={handleChange}
                    name="profileImage"
                    type="text"
                  />
                </Col>
                <Col span={12} offset={6}>
                  <span>Website</span>
                  <Input
                    defaultValue={currentUser.websiteUrl}
                    onChange={handleChange}
                    name="websiteUrl"
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
                  <span>Education</span>
                  <Input
                    defaultValue={currentUser.education}
                    onChange={handleChange}
                    name="education"
                    type="text"
                  />
                </Col>
                <Col span={12} offset={6}>
                  <span>Twitter</span>
                  <Input
                    defaultValue={currentUser.twitterUsername}
                    onChange={handleChange}
                    name="twitterUsername"
                    type="text"
                  />
                </Col>
                <Col span={12} offset={6}>
                  <span>Github</span>
                  <Input
                    defaultValue={currentUser.githubUsername}
                    onChange={handleChange}
                    name="githubUsername"
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
mutation ($id: Int!, $email: String, $username: String, $name: String, $profileImage: String, $websiteUrl: String, $bio: String, $location: String, $education: String, $twitterUsername: String, $githubUsername: String) {
  updateUserInfo(id: $id, email: $email, username: $username, profileImage: $profileImage, websiteUrl: $websiteUrl, bio: $bio, location: $location, education: $education, name: $name, twitterUsername: $twitterUsername, githubUsername: $githubUsername) {
    email
    username
    profileImage
    websiteUrl
    bio
    location
    education
    twitterUsername
    githubUsername
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
