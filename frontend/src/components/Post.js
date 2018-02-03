import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import '../routes/index.css'

const Post = ({ post }) => (
  <div>
    <img src={post.imageUrl} alt="post_image" />
    <h1 className="post-title">{post.title}</h1>
    <h3>
      <Link to={`/@${post.user.username}`}>{post.user.username}</Link>
    </h3>
    <h3>{moment(post.createdAt).format('MMM. D [at] HH:MM')}</h3>
    <p>{post.content}</p>
  </div>
)

export default Post
