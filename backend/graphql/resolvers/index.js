const PostResolvers = require('./post-resolver')

module.exports = {
  Query: {
    getPost: PostResolvers.getPost,
    getPosts: PostResolvers.getPosts
  }
}
