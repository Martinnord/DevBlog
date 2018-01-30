import React, { Component } from 'react'
import request from 'superagent'
import GifItem from '../components/GifItem'

export default class NotFound extends Component {
  constructor() {
    super()
    this.state = {
      gif: {},
    }
  }

  componentDidMount() {
    const randomDigit = Math.floor((Math.random() * 104) + 5)

    const url = `https://api.giphy.com/v1/gifs/search?api_key=dppowCiYXsJgxcuSgfRf4CGWqx2onwuo&q=fail&limit=1&offset=${randomDigit}&rating=PG&lang=en`

    request.get(url, (_, res) => {
      this.setState({ gif: res.body.data[0].images.downsized.url })
    })
  }

  render() {
    return (
      <GifItem gif={this.state.gif} />
    )
  }
}
