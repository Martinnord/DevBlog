import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostList from './components/postList'
import { fetchPosts } from './redux/postsAction'
import { Link } from 'react-router-dom'
import MainNavbar from '../../common/components/navbar'
import "../../styles/css/postslayout.css"


class PostLayout extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    const posts = this.props.posts || []

    const postList = posts.map((postContent, i) => {
      return <PostList key={i} postContent={postContent} />
    })

    return (
      <div className="App">
        <MainNavbar />
          <h1 className="title text-right">Devblog</h1>
          <Link to="/createpost">
          </Link>
        <div>{postList}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.fetchPosts.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostLayout)
