const User = require('../models/user.model')

module.exports = {
  createUser: async (userObj) => {
    return await User.create(userObj)
  },
  getUserByEmail: async (email) => {
    return await User.findOne({ email })
  },
  getUserById: async (_id) => {
    return await User.findById(_id)
  },
  verifyAccount: async (_id) => {
    console.log(_id)
    return await User.findByIdAndUpdate(_id, { verified: true }).exec()
  },
}
