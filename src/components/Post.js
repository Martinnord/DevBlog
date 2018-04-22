import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Icon, Modal, Buttonl } from 'antd'
import { Editor } from 'slate-react'

import '../routes/index.css'

class Post extends Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  handleOk = e => {
    console.log(e)
    this.setState({
      visible: false
    })
  }
  handleCancel = e => {
    this.setState({
      visible: false
    })
  }

  render() {
    const renderMark = props => {
      const { children, mark } = props
      switch (mark.type) {
        case 'title':
        return <h3>{children}</h3>
      case 'sub.title':
        return <h4>{children}</h4>
      case 'bold':
        return <strong>{children}</strong>
      case 'code':
        return <code>{children}</code>
      case 'italic':
        return <em>{children}</em>
      case 'underlined':
        return <u>{children}</u>
      }
    }

    const { post, content, likePost } = this.props

    return (
      <div className="post">
        <img
          className="post-image"
          src={`${post.image_url ? `${post.image_url}` : ''}`}
          alt={post.image_url}
        />
        <div className="post-text">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-social">
            <span style={{ margin: '0 5px 0 0' }}>
              <h3 className="post-author">
                <Link to={`/@${post.user.username}`} className="post-author">
                  <img
                    src={post.user.profile_image}
                    className="post-profile-image"
                  />
                  {post.user.name || post.user.username}
                </Link>
              </h3>
            </span>
            <span style={{ margin: '0 5px 0 0' }}>
              <Link
                target="_blank"
                to={`https://twitter.com/${post.user.twitter_username}`}
              >
                <Icon type="twitter" style={{ color: '#666' }} />
              </Link>
            </span>
            <span style={{ margin: '0 5px 0 0' }}>
              <Link
                target="_blank"
                to={`https://github.com/${post.user.github_username}`}
              >
                <Icon type="github" style={{ color: '#666' }} />
              </Link>
            </span>
          </div>
          <h3 className="post-date">
            {moment(post.created_at).format('MMM. D[,] YYYY')}
          </h3>
          <Modal
            title="Liked by"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            {post.likes.map(like => {
              return (
                <div key={like.id} style={{ display: 'flex', flexDirection: 'row' }}>
                  <img
                    src={like.profile_image}
                    style={{ height: '30px', width: '30px' }}
                  />
                  <p>
                    <Link to={`/@${like.username}`}>{like.username}</Link>
                  </p>
                </div>
              )
            })}
          </Modal>
          <Editor
            className="post-content"
            readOnly
            value={content}
            renderMark={renderMark}
          />
          <div className="post-likes">
            <span onClick={likePost}>
              <Icon type="heart" style={{ color: '#f5222d' }} />{' '}
            </span>
            <span onClick={this.showModal}>{post.likes.length} likes</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Post
