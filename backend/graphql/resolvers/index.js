const PostResolvers = require('./post-resolver')

module.exports = {
  Query: {
    getPosts: PostResolvers.getPosts
  }
}
