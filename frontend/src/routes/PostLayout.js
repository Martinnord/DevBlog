import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { Layout } from 'antd'
import Navbar from '../common/Navbar'
import Post from '../components/Post'
import { getAllPostsQuery } from '../graphql/newArticle'
import { Value } from 'slate'

import './index.css'

const { Content } = Layout

const postLikedSubscription = gql`
subscription ($id: ID!) {
  postLiked(id: $id) {
    id
    likes {
      username
    }
  }
}
`


class PostLayout extends Component {
  componentWillMount() {
    console.log(this.props)
    this.props.data.subscribeToMore({
      document: postLikedSubscription,
      variables: {
        id: this.props.data.variables.id,
      },
      updateQuery: (prev, {subscriptionData}) => {
        console.log('subscriptionData', subscriptionData)
        console.log('prev', prev)
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          ...prev,
          likes: [...prev.likes, subscriptionData.data.postLiked]
        }    
       }
    });
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
      <Layout style={{ background: '#ECECEC' }}>
        <Navbar />
        <Content>
          <hr className="hr" />
          <Post content={parsedContent} post={getPost} />
          <button onClick={this.props.likePost}>Like this post!</button>
        </Content>
      </Layout>
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
      }
      user {
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
        console.log('mutate', typeof ownProps.data.getPost.id)
        mutate({
          variables: {
            id: ownProps.data.getPost.id
          },
          update: (store, { data: likePost }) => {
            const data = store.readQuery({
              query: getAllPostsQuery
            })
            data.getAllPostsQuery.push(likePost)
            store.writeQuery({ query: getAllPostsQuery, data })
          }
        })
      }
    })
  })
)(PostLayout)

// update: (proxy, { data: { register } }) => {
//   // update the cache with the new currentUser
//   const currentUser = {
//     id: register.id,
//     username: register.username,
//     email,
//     jwt: register.jwt,
//   }

//   proxy.writeQuery({ query: currentUserQUERY, data: { currentUser } })

//   // Store the token
//   localStorage.setItem('token', register.jwt)
// },
