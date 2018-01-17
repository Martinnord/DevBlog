import GraphQLDate from 'graphql-date'
import Post from '../models/post'
import yup from 'yup'


export default {
  Date: GraphQLDate,
  Query: {
    async getAllPosts() {
      return await Post.query().orderBy('createdAt', 'desc')
    },
    async getPost(_, { id }) {
      return await Post.query().findById(id)
    }
  },
  Mutation: {
    async createPost(_, { title, content }) {
      try {
        const post = await Post.query().insert({ title, content })
        return post
      } catch (err) {
        console.log(err)
        return false
      }
    },
    async updatePost(_, { id, title, content }) {
      return await Post.query().patchAndFetchById(id, { title, content })
    },
    async deletePost(_, { id }) {
      return await Post.query().deleteById(id)
    }
  }
}
