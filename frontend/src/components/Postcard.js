import React from 'react'
import { Card, Col } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Value, Text } from 'slate'
import Plain from 'slate-plain-serializer'
import { Editor } from 'slate-react'

import '../routes/index.css'

const { Meta } = Card

const PostCard = ({ posts }) => (
  <Col span={12} offset={6}>
    {posts.map(post => {
      const content = Value.fromJSON(JSON.parse(post.content))
      const lol = JSON.stringify(content)
      return (
        <Link to={`/@${post.user.username}/${post.id}`} key={post.id}>
          <Card
            style={{ margin: '20px 0 20px 0' }}
            hoverable
            cover={<img src={`${post.imageUrl ? `${post.imageUrl}` : ''}`} />}
          >
            <Meta
              title={post.title}
              description={
                <Editor
                  readOnly
                  value={content}
                />
              }
              // description={content}
              // description={`${
              //   post.content.length > 135
              //     ? `${post.content.substring(0, 135)}...`
              //     : post.content
              // }`}
            />
            <p>Written by {post.user.username}</p>
            {/* <p>{Value.fromJSON(post.content)}</p> */}
            <p>{moment(post.createdAt).format('HH:mm D/MM')}</p>
          </Card>
        </Link>
      )
    })}
  </Col>
)

export default PostCard
