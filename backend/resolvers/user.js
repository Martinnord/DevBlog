import GraphQLDate from 'graphql-date'
import User from '../models/user'
import bcrypt from 'bcryptjs'
import { promisify } from 'util'
import { knex } from '../config/database'
import yup from 'yup'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import constants from '../config/constants'

const hashAsync = promisify(bcrypt.hash)

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('Please enter an email address'),
  username: yup.string().required('Please enter an username'),
  password: yup
    .string()
    .required('Please enter a password')
    .min(5)
})

export async function context(headers, constants) {
  console.log('calling context') // This never prints, so it's not being called.
  const user = await getUser(headers['authorization'])
  return {
    headers,
    user
  }
}

export default {
  Date: GraphQLDate,
  Query: {
    currentUser: (root, args, { user }) => {
      console.log('context', user)
      return user
    },
    getUsers: async () => {
      return await User.query()
    },
    getUser: async (_, { id }) => {
      return await User.query().findById(id)
    }
  },
  Mutation: {
    login: async (_, { email, password }, context) => {
      console.log('context', context)
      const user = await knex('users')
        .where('email', email)
        .first()
      console.log(user)

      if (!user) {
        throw new Error('Invalid email/password')
      }

      const validPassword = await bcrypt.compare(password, user.password)

      if (!validPassword) {
        throw new Error('Invalid email/password')
      }

      // Adding a jwt token to the user
      user.jwt = jwt.sign({ id: user.id }, constants.JWT_SECRET)

      return user
    },
    register: async (_, { email, username, password }) => {
      await schema.validate({ email, username, password })
      const users = await knex('users').where('email', email)

      const userExists = (await knex('users').where({ email })).length === 1

      if (userExists) {
        throw new Error('Email/username already in use')
      } else {
        const hashedPassword = await hashAsync(password, bcrypt.genSaltSync(10))

        const user = await User.query().insert({
          email,
          username,
          password: hashedPassword
        })

        // Adding a jwt token to the user
        user.jwt = jwt.sign({ id: user.id }, constants.JWT_SECRET)

        return user
      }
    }
  }
}
