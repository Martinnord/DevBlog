const Post = require('../models/Post.model')

// Get all posts
const getAllPosts = (req, res, next) => {
  Post.find((err, posts) => {
    if (err) {
      res.status(500).json({ err })
    }
    res.status(200).json({ posts })
  })
}

// Get post by id
const getPostById = (req, res, next) => {
  const id = req.params.id

  Post.findById(id, (err, post) => {
    if (err) {
      res.status(500).json({ err })
    }
    res.status(200).json({ post })
  })
}

// Create post
const createPost = (req, res, next) => {
  const title = req.body.title
  const content = req.body.content

  if (!title) {
    res.status(422).json({ error: 'Titel saknas!!!' })
  }

  if (!content) {
    res.status(422).json({ error: 'Skriv något för fan!' })
  }

  const post = new Post({
    title,
    content
  })

  post.save((err, post) => {
    if (err) {
      res.status(500).json({ err })
    }
    res.status(201).json({ post })
  })
}

// Update post by id
const updatePost = (req, res, next) => {
  const id = req.params.id

  Post.findByIdAndUpdate(id, req.body, (err, post) => {
    if (err) {
      res.status(500).json({ err })
    }
    res.status(200).json({ post })
  })
}

// Delete post by id
const deletePost = (req, res, next) => {
  const id = req.params.id

  Post.findByIdAndRemove(id, (err, post) => {
    if (err) {
      res.status(500).json({ err })
    }
    res.status(200).json({ post })
  })
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
}
