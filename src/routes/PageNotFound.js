import React, { Component } from 'react'
import request from 'superagent'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import './index.css'

export default class NotFound extends Component {
  constructor() {
    super()
    this.state = {
      gif: {},
    }
  }

  componentDidMount() {
    document.title = '404 | Devblog'

    const randomDigit = Math.floor(Math.random() * 104 + 5)

    const url = `https://api.giphy.com/v1/gifs/search?api_key=dppowCiYXsJgxcuSgfRf4CGWqx2onwuo&q=fail&limit=1&offset=${randomDigit}&rating=PG&lang=en`

    request.get(url, (_, res) => {
      this.setState({ gif: res.body.data[0].images.downsized.url })
    })
  }

  render() {
    return (
      <div
        className="not-found-layout"
        style={{ backgroundImage: `url(${this.state.gif})`, height: '100%' }}
      >
        <div className="not-found-container">
          <h1 className="not-found-header">404</h1>
          <p className="not-found-text">
            Sorry, the page doesn't seem to exist!
          </p>
          <Button className="back-button">
            <Link to="/">Back to Devblog</Link>
          </Button>
        </div>
      </div>
    )
  }
}
