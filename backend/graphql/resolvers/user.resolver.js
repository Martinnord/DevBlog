import User from "../../models/user.model";

export default {
  async getUsers() {
    return await User.query();
  },
  async getUser(_, { id }) {
    return await User.query().findById(id);
  }
  // signup: (_, args) => {
  //   console.log('args', args)
  //   return User.create({ args })
  // }
};
