import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Icon, Col } from 'antd'
import { EditorState, RichUtils, convertFromRaw } from 'draft-js'

import '../routes/index.css'

const Post = ({ post }) => (
  <Col span={12} offset={6}>
    {/* <img className="post-image" src={post.imageUrl} alt="post_image" /> */}
    <h1 className="post-title">{post}</h1>
    <div style={{ display: 'flex' }}>
      {/* <h3>Written by </h3>
      <Link to={`/@${post.user.username}`}>
        {post.user.name || post.user.username}
      </Link>
      <Link to={`https://twitter.com/${post.user.twitterUsername}`}>
        <Icon type="twitter" />
      </Link>
      <Link to={`https://github.com/${post.user.githubUsername}`}>
        <Icon type="github" />
      </Link> */}
    </div>
    <h3>{moment(post.createdAt).format('MMM. D[,] YYYY')}</h3>
    {/* <p className="post-content">{convertFromRaw(JSON.parse(post.content))}</p> */}
  </Col>
)

export default Post
