import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Icon, Col } from 'antd'

import '../routes/index.css'

const Post = ({ post }) => (
  <Col span={12} offset={6}>
    <img className="post-image" src={post.imageUrl} alt="post_image" />
    <h1 className="post-title">{post.title}</h1>
    <h3>
      <Link to={`/@${post.user.username}`}>{post.user.name}</Link>
      <Link to={`https://twitter.com/${post.user.twitterUsername}`}><Icon type="twitter" /></Link>
      <Link to={`https://github.com/${post.user.githubUsername}`}><Icon type="github" /></Link>
    </h3>
    <h3>{moment(post.createdAt).format('MMM. D[,] YYYY')}</h3>
    <p className="post-content">{post.content}</p>
  </Col>
)

export default Post
