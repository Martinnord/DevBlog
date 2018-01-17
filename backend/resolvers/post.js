import GraphQLDate from 'graphql-date'
import Post from '../models/post'
import yup from 'yup'


export default {
  Date: GraphQLDate,
  Query: {
    getAllPosts: async () => {
      return await Post.query().orderBy('createdAt', 'desc')
    },
    getPost: async (_, { id }) => {
      return await Post.query().findById(id)
    }
  },
  Mutation: {
    createPost: async (_, { title, content }) => {
      try {
        const post = await Post.query().insert({ title, content })
        return post
      } catch (err) {
        console.log(err)
        return false
      }
    },
    updatePost: async (_, { id, title, content }) => {
      return await Post.query().patchAndFetchById(id, { title, content })
    },
    deletePost: async (_, { id }) => {
      return await Post.query().deleteById(id)
    }
  }
}
