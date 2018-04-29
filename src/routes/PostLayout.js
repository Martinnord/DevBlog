import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { Layout, Row } from 'antd'
import { Value } from 'slate'
import Navbar from '../common/Navbar'
import Post from '../components/Post'
import FooterComponent from '../common/Footer'
import POST_LIKED_SUBSCRIPTION from '../graphql/subscriptions/postLiked'
import GET_POST_QUERY from '../graphql/queries/getPost'
import LIKE_POST_MUTATION from '../graphql/mutations/likePost' 
import GET_ALL_POSTS_QUERY from '../graphql/queries/getAllPosts'
import './index.css'

const { Content } = Layout

class PostLayout extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: POST_LIKED_SUBSCRIPTION,
      variables: {
        id: this.props.data.variables.id
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev
        }

        return {
          ...prev,
          likes: [...prev, subscriptionData.data.postLiked.likes]
        }
      }
    })
  }

  render() {
    document.body.style.background = '#F9F9FA'

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
          <Row className="post-row">
            <Post
              content={parsedContent}
              post={getPost}
              likePost={this.props.likePost}
            />
          </Row>
        </Content>
        <FooterComponent />
      </Layout>
    )
  }
}

export default compose(
  graphql(GET_POST_QUERY, {
    skip: props => !props.match.params.id,
    options: props => ({
      variables: { id: props.match.params.id }
    })
  }),
  graphql(LIKE_POST_MUTATION, {
    alias: 'likePost',
    props: ({ mutate, ownProps }) => ({
      likePost: () => {
        mutate({
          variables: {
            id: ownProps.data.getPost.id
          },
          update: (store, { data: likePost }) => {
            const data = store.readQuery({
              query: GET_ALL_POSTS_QUERY
            })
            data.getAllPosts.push(likePost)
            store.writeQuery({ query: GET_ALL_POSTS_QUERY, data })
          }
        })
      }
    })
  })
)(PostLayout)
