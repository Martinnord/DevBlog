import React from 'react'
import { Card, Col, Icon } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Value } from 'slate'

import '../routes/index.css'

const { Meta } = Card

const PostCard = ({ posts }) => (
  <Col span={12} offset={6}>
    {posts.map(post => {
      return (
        <Link to={`/@${post.user.username}/${post.id}`} key={post.id}>
          <Card
            style={{ margin: '20px 0 20px 0' }}
            hoverable
            cover={<img src={`${post.image_url ? `${post.image_url}` : ''}`} />}
          >
            <Meta title={post.title} />
            <p>
              Written by{' '}
              <Link to={`/@${post.user.username}`}>
                {/* <img style={{ height: '30px', width: '30px' }} src={post.likes.profile_image} /> */}
                {post.user.name || post.user.username}
              </Link>
            </p>
            <p>
              <Icon type="heart" style={{ color: '#f5222d' }} /> {post.likes.length}
            </p>
            <p>{moment(post.created_at).format('HH:mm D/MM')}</p>
          </Card>
        </Link>
        )
    })}
  </Col>
)

export default PostCard
