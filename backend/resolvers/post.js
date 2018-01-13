import GraphQLDate from 'graphql-date'
import Post from '../models/post'

export default {
  Date: GraphQLDate,
  Query: {
    async getPosts() {
      return await Post.query().orderBy('createdAt', 'desc')
    },
    async getPost(_, { id }) {
      return await Post.query().findById(id)
    }
  },
  Mutation: {
    async createPost(_, args) {
      return await Post.query().insert(args)
    },
    async updatePost(_, { id, title, content }) {
      return await Post.query().patchAndFetchById(id, { title, content })
    },
    async deletePost(_, { id }) {
      return await Post.query().deleteById(id)
    }
  }
}
