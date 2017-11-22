import GraphQLDate from "graphql-date";
import User from "../models/user";
import bcrypt from "bcryptjs";


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
    async createUser(_, args) {
      console.log('args', args)
      const passwordHash = bcrypt.hashSync(args.password, bcrypt.genSaltSync(10));
      return await User.query().insert({
        email: args.email, 
        username: args.username, 
        password: passwordHash});
    },
  }
};



//     const salt = await bcrypt.genSalt(10)
//     // Generate a password hash (salt + hash)
//     const passwordHash = await bcrypt.hash(user.local.password, salt)
//     // Re-assign hashed version over original, plain text password
//     user.local.password = passwordHash