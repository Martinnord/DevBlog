import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'

import '../postsLayout.css'

class PostList extends Component {
  render() {
    const { postContent } = this.props
    return (
      <div>
        <Row style={{ marginTop: '20px' }}>
          <Col md={12}>
            <ul className="posts-list">
              <li className="posts-flex-container">
                <div className="posts-flex-item-1">
                  <h1 className="posts-title-text">
                    {postContent.title}
                  </h1>
                  <p className="posts-sub-title-text">
                    {postContent.content}
                  </p>
                  <p className="post-list-content">
                    {`Postat: ${moment(postContent.timestamp).format(
                      'HH:mm DD/MMM'
                    )}`}
                  </p>
                </div>
              </li>
            </ul>
          </Col>
        </Row>
        <hr style={{ width: '50%' }} />
      </div>
    )
  }
}

export default PostList
