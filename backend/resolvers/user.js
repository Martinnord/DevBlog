import GraphQLDate from 'graphql-date'
import User from '../models/user'
import bcrypt from 'bcryptjs'
import { promisify } from 'util'
import { knex } from '../config/database'

const hashAsync = promisify(bcrypt.hash)

export default {
  Date: GraphQLDate,
  Query: {
    getUsers: async () => {
      return await User.query()
    },
    getUser: async (_, { id }) => {
      return await User.query().findById(id)
    }
  },
  Mutation: {
    register: async (_, { email, username, password }) => {
      try {
        const x = await knex('users')
          .where('email', email)
          .select('id')
        if (x.length === 0) {
          const hashedPassword = await hashAsync(
            password,
            bcrypt.genSaltSync(10)
          )
          const user = await User.query().insert({
            email,
            username,
            password: hashedPassword
          })
          return user
        } else {
          console.log('user already exists')
        }
      } catch (err) {
        return false
      }
    }
  }
}
