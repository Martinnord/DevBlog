import React, {Component} from 'react'
import {Card, Col, Icon} from 'antd'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'

import '../routes/index.css'

const {Meta} = Card

class PostCard extends Component {
  toPost = (post, history) => {
    console.log('post', post)
    console.log('history', history)
    this
      .props
      .history
      .push(`/@${post.user.username}/${post.id}`)
  }
  render() {

    const {posts, history} = this.props

    return (
      <Col span={12} offset={6}>
        {posts.map(post => {
          return (
            <div onClick={() => this.toPost(post, history)} key={post.id}>
              <Card
                hoverable
                cover={< img src = {
                `${post.image_url
                  ? `${post.image_url}`
                  : ''}`
              }
              alt = "article cover" />}>
                <Meta title={post.title}/>
                <p>
                  Written by{' '}
                  <Link to={`/@${post.user.username}`} style={{ color: '#666' }}>
                    {/* <img style={{ height: '30px', width: '30px' }} src={post.likes.profile_image} /> */}
                    {post.user.name || post.user.username}
                  </Link>
                </p>
                <p>
                  <Icon
                    type="heart"
                    style={{
                    color: '#f5222d'
                  }}/>{post.likes.length}
                </p>
                <p>{moment(post.created_at).format('HH:mm D/MM')}</p>
              </Card>
            </div>
          )
        })}
      </Col>
    )
  }
}

export default withRouter(PostCard)
