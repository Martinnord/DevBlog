const User =  require('../../models/user.model')

module.exports = {
  signup: (_, args) => {
    console.log('args', args)
    return User.create({ args })
  }
}