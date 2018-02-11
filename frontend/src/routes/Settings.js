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
          try {
          await this.props.updateUserInfo({
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
            },
          })
          alert("Your profile was successfully updated.")
          } catch (err) {
            setSubmitting(false)
          }
        }}
        render={({
          isSubmitting,
          handleChange,
          handleSubmit,
        }) => (
          <Layout>
            <Navbar />
            <Content>
              <Row>
                <Col span={12} offset={6}>
                  <h1>Settings</h1>
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
                <Col>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Submit
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
mutation ($id: Int!, $email: String, $username: String, $name: String, $profileImage: String, $websiteUrl: String, $bio: String, $location: String, $education: String) {
  updateUserInfo(id: $id, email: $email, username: $username, profileImage: $profileImage, websiteUrl: $websiteUrl, bio: $bio, location: $location, education: $education, name: $name) {
    email
    username
    profileImage
    websiteUrl
    bio
    location
    education
  }
}
`

const updateUserInfo = graphql(updateUserInfoMutation, {
  name: 'updateUserInfo',
  options: (props) => {
    return {
      variables: props.id,
    }
  },
})

export default compose(updateUserInfo, CurrentUser)(Settings)
