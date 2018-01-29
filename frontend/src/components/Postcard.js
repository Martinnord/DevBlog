import React from 'react'
import { Card } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'

const { Meta } = Card

const PostCard = props => (
  <div>
    {props.posts.map(post => (
      <Link to={`/@${post.user.username}/article/${post.id}`}>
        <Card
          key={post.id}
          hoverable
          cover={
            <img
              alt="example"
              src="https://www.elegantthemes.com/blog/wp-content/uploads/2017/07/programming-languages-to-learn-for-wordpress-featured-image.png"
            />
          }
        >
          <Meta title={post.title} description={post.content} />
          <p>Written by {post.user.username}</p>
          <p>{moment(post.createdAt).format('HH:mm D/MM')}</p>
        </Card>
      </Link>
    ))}
  </div>
)

export default PostCard
