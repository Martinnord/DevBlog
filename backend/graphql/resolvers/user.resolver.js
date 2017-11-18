import User from "../../models/user.model";

export default {
  async getUsers() {
    return await User.query();
  }
  // signup: (_, args) => {
  //   console.log('args', args)
  //   return User.create({ args })
  // }
};
