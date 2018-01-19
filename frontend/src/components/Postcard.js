import React from 'react'
import { Card } from 'antd'
import moment from 'moment'

const { Meta } = Card

const PostCard = props => (
  <div>
    {props.posts.map(u => (
      <Card
        key={u.id}
        hoverable
        cover={
          <img
            alt="example"
            src="https://www.elegantthemes.com/blog/wp-content/uploads/2017/07/programming-languages-to-learn-for-wordpress-featured-image.png"
          />
        }
      >
        <Meta title={u.title} description={u.content} />
        <p>Skriven av {u.user.username}</p>
        <p>{moment(u.createdAt).format('HH:mm D/MM')}</p>
      </Card>
    ))}
  </div>
)

export default PostCard
