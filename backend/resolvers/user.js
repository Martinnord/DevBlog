import GraphQLDate from "graphql-date";
import User from "../models/user";
import bcrypt from "bcryptjs";
const { promisify } = require("util");

const hashSync = promisify(bcrypt.hash);

export default {
  Date: GraphQLDate,
  Query: {
    async getUsers() {
      return await User.query();
    },
    async getUser(_, { id }) {
      return await User.query().findById(id);
    }
  },
  Mutation: {
    async createUser(_, { email, username, password }) {
      const hash = await hashSync(password, bcrypt.genSaltSync(10));
			console.log(hash)
      return await User.query().insert({ email, username, password: hash });
    }
    // async createUser(_, { email, username, password }) {
    //   const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    //     return await User.query().insert({ email, username, password: passwordHash });
    // }
  }
};

//     const salt = await bcrypt.genSalt(10)
//     // Generate a password hash (salt + hash)
//     const passwordHash = await bcrypt.hash(user.local.password, salt)
//     // Re-assign hashed version over original, plain text password
//     user.local.password = passwordHash
