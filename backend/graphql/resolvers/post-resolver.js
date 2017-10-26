const Post = require('../../models/Post.model')

module.exports = {
  getPost: (_, { _id }) => Post.findById(_id),
  getPosts: () => Post.find({})
}