import React from 'react'

const Post = ({ data }) => {
  console.log(data)
  return (
    JSON.stringify({data})
  )
}

export default Post
