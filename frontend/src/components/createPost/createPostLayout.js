import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CreatePostForm from './components/createPostForm'
import { createPost } from './redux/createPostAction'
import '../../index.css'

import './newPost.css'

class CreatePostLayout extends Component {
  submit(values) {
    this.props.createPost(values)
    alert('Tack din jävel.. Den är postad...')
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h1 className="title">Martin's blogg</h1>
          <Link to="/" className="back-home">
            <p style={{ color: '#fff' }}>Tillbaka</p>
          </Link>
        </div>
        <div className="create-post-title">
          <h1>Skapa en ny post</h1>
          <CreatePostForm onSubmit={this.submit.bind(this)} />
        </div>
      </div>
    )
  }
}

export default connect(null, { createPost })(CreatePostLayout)
