import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Signup extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="title text-center">Martin's Blogg</h1>
          <Link to="/createpost">
            <p className="create-post" style={{ color: '#fff' }}>
              Gef fan i att skapa en ny post!
            </p>
          </Link>
        </div>
        <div>{postList}</div>
      </div>
    )
  }
}

PostLayout.propTypes = {
  fetchPosts: PropTypes.func.isRequired
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
