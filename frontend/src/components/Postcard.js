import React from 'react'
import { Card } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'
import '../routes/index.css'

const { Meta } = Card

const PostCard = props => (
  <div>
    {props.posts.map(post => (
      <Link to={`/@${post.user.username}/${post.id}`} key={post.id}>
        <Card
          style={{ margin: '20px 0 20px 0' }}
          hoverable
          cover={
            <img
              alt="example"
              src={`${post.imageUrl ? `${post.imageUrl}` : ''}`}
            />
          }
        >
          <Meta
            title={post.title}
            description={`${
              post.content.length > 135
                ? `${post.content.substring(0, 135)}...`
                : post.content
            }`}
          />
          <p>Written by {post.user.username}</p>
          <p>{moment(post.createdAt).format('HH:mm D/MM')}</p>
        </Card>
      </Link>
    ))}
  </div>
)

export default PostCard
