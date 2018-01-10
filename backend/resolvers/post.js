import GraphQLDate from 'graphql-date'
import Post from '../models/post'

export default {
  Date: GraphQLDate,
  Query: {
    async getPosts() {
      return await Post.query()
    },
    async getPost(_, { id }) {
      return await Post.query().findById(id)
    }
  },
  Mutation: {
    async createPost(_, args) {
      console.log(args)
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
