import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Icon, Row, Col } from 'antd'
import { Editor } from 'slate-react'

import '../routes/index.css'

const Post = ({ post, content }) => {
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
  
  return (
    <Row>
      <Col span={12} offset={6}>
        <img className="post-image" src={`${post.image_url ? `${post.image_url}` : ''}`} />
        <h1 className="post-title">{post.title}</h1>
        <div style={{ display: 'flex' }}>
          <h3>Written by </h3>
          <Link to={`/@${post.user.username}`}>
            {post.user.name || post.user.username}
          </Link>
          <Link
            target="_blank"
            to={`https://twitter.com/${post.user.twitter_username}`}
          >
            <Icon type="twitter" />
          </Link>
          <Link
            target="_blank"
            to={`https://github.com/${post.user.github_username}`}
          >
            <Icon type="github" />
          </Link>
        </div>
        <h3>{moment(post.created_at).format('MMM. D[,] YYYY')}</h3>
        <p>Likes {post.likes.length}</p>
        <Editor
          className={'post-content'}
          readOnly
          value={content}
          renderMark={renderMark}
        />
      </Col>
    </Row>
  )
}

export default Post
