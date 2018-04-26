import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { Layout, Row } from 'antd'
import { Value } from 'slate'
import Navbar from '../common/Navbar'
import Post from '../components/Post'
import { getAllPostsQuery } from '../graphql/newArticle'

import './index.css'

const { Content } = Layout

const postLikedSubscription = gql`
  subscription($id: ID!) {
    postLiked(id: $id) {
      id
      likes {
        username
        profile_image
      }
    }
  }
`
class PostLayout extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: postLikedSubscription,
      variables: {
        id: this.props.data.variables.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev
        }

        return {
          ...prev,
          likes: [...prev, subscriptionData.data.postLiked.likes],
        }
      },
    })
  }

  render() {
    const { loading, getPost } = this.props.data

    if (!this.props.data) {
      return <Redirect to={{ pathname: '/404' }} />
    }

    if (loading) {
      return null
    }

    if (!loading && !getPost) {
      return <Redirect to={{ pathname: '/404' }} />
    }

    const contentObj = JSON.parse(getPost.content)
    const parsedContent = Value.fromJSON(contentObj)

    return (
      <div style={{ background: '#ECECEC' }}>
        <Navbar />
        <Content>
          <Row className="post-row">
            <Post content={parsedContent} post={getPost} likePost={this.props.likePost} />
          </Row>
        </Content>
      </div>
    )
  }
}

const getPostQuery = gql`
  query($id: Int!) {
    getPost(id: $id) {
      id
      title
      content
      image_url
      created_at
      likes {
        username
        profile_image
      }
      user {
        id
        name
        username
        profile_image
        bio
        twitter_username
        github_username
      }
    }
  }
`

const likePostMutation = gql`
  mutation($id: ID!) {
    likePost(id: $id) {
      id
      likes {
        username
        profile_image
      }
    }
  }
`

export default compose(
  graphql(getPostQuery, {
    skip: props => !props.match.params.id,
    options: props => ({
      variables: { id: props.match.params.id }
    })
  }),
  graphql(likePostMutation, {
    alias: 'likePost',
    props: ({ mutate, ownProps }) => ({
      likePost: () => {
        mutate({
          variables: {
            id: ownProps.data.getPost.id
          },
          update: (store, { data: likePost }) => {
            const data = store.readQuery({
              query: getAllPostsQuery
            })
            data.getAllPosts.push(likePost)
            store.writeQuery({ query: getAllPostsQuery, data })
          }
        })
      }
    })
  })
)(PostLayout)
