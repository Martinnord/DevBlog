import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import '../newPost.css'

class CreatePostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: ''
    }
  }

  submit() {
    this.props.submit()
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form className="create-new-post-container" onSubmit={handleSubmit}>
        <div className="create-post-header">
          <h3 className="new-post-title text-center">Ny Post</h3>
        </div>
        <div className="new-post-input">
          <Field
            placeholder="Titel"
            name="title"
            component="input"
            type="text"
          />
        </div>
        <div className="new-post-input">
          <Field
            className="content-area"
            placeholder="Content"
            name="content"
            component="textarea"
            type="text"
          />
        </div>
        <button className="create-post-btn" type="submit">
          Submit
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'createPostForm'
})(connect()(CreatePostForm))
