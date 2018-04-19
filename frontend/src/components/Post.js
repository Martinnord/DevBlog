import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Icon, Modal, Button } from 'antd'
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
      // <Row>
      //   <Col span={12} offset={3} style={{ backgroundColor: '#FFF' }}>
      <div className="post">
        <img
          className="post-image"
          src={`${post.image_url ? `${post.image_url}` : ''}`}
          alt={post.image_url}
        />
        <h1 className="post-title">{post.title}</h1>
        <div style={{ display: 'flex' }}>
          <span style={{ margin: '0 5px 0 0' }}>
            <h3>
              Written by{' '}
              <Link to={`/@${post.user.username}`}>
                {post.user.name || post.user.username}
              </Link>
            </h3>
          </span>
          <span style={{ margin: '0 5px 0 0' }}>
            <Link
              target="_blank"
              to={`https://twitter.com/${post.user.twitter_username}`}
            >
              <Icon type="twitter" />
            </Link>
          </span>
          <span style={{ margin: '0 5px 0 0' }}>
            <Link
              target="_blank"
              to={`https://github.com/${post.user.github_username}`}
            >
              <Icon type="github" />
            </Link>
          </span>
        </div>
        <h3>{moment(post.created_at).format('MMM. D[,] YYYY')}</h3>
        <Modal
          title="Liked by"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          {post.likes.map((like, i) => {
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
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

        <Button type="primary" onClick={this.showModal}>
          <Icon type="heart" /> {post.likes.length} likes
        </Button>
        <button onClick={likePost}>Like this Post!</button>
      </div>
    )
  }
}

export default Post
