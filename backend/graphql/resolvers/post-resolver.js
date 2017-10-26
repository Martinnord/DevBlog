const Post = require('../../models/Post.model')

module.exports = {
  getPosts: () => Post.find({})
}
