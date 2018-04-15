import GraphQLDate from 'graphql-date'
import Post from '../models/post'
import User from '../models/user'
import PostLikes from '../models/PostLikes'
import yup from 'yup'
import { requireAuth } from '../services/auth'

export default {
  Date: GraphQLDate,
  Post: {
    user: ({ user_id }) => {
      return User.query().findById(user_id)
    },
    likes: async ({ id, user_id }) => {
      return await PostLikes.query()
        .where('post_id', id)
        .select('users.username')
        .from('post_likes')
        .fullOuterJoin('users', 'post_likes.user_id', 'users.id')
    }
  },
  Query: {
    getAllPosts: async () => {
      return await Post.query().orderBy('created_at', 'desc')
    },
    getPost: async (_, { id }) => {
      return await Post.query().findById(id)
    },
    getUserPosts: async (_, args, { user }) => {
      try {
        return await Post.query().where('user_id', user.id)
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    createPost: async (_, { title, content, image_url }, { user }) => {
      try {
        await requireAuth(user)
        return await Post.query().insert({
          title,
          content,
          image_url,
          user_id: user.id
        })
      } catch (err) {
        throw err
      }
    },
    updatePost: async (_, { id, title, content, image_url }, { user }) => {
      try {
        await requireAuth(user)
        return await Post.query().patchAndFetchById(id, {
          title,
          content,
          image_url
        })
      } catch (err) {
        throw err
      }
    },
    deletePost: async (_, { id }, { user }) => {
      try {
        await requireAuth(user)
        return await Post.query().deleteById(id)
      } catch (err) {
        throw err
      }
    },
    likePost: async (_, { id }, { user }) => {
      try {
        await requireAuth(user)
        return await PostLikes.query()
          .where('post_id', id)
          .insert({
            user_id: user.id,
            post_id: parseInt(id)
          })
      } catch (err) {
        throw err
      }
    }
  }
}
