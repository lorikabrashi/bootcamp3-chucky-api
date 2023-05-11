const userService = require('../services/user.service')
const { EmailNotFound, InvalidAccount, NotVerifiedAccount } = require('../lib/errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const emailService = require('../services/email.service')

module.exports = {
  register: async (userObj) => {
    const hashedPassword = bcrypt.hashSync(userObj.password, parseInt(process.env.HASH_SALT))
    userObj.password = hashedPassword
    const user = await userService.createUser(userObj)

    const session = { _id: user._id }
    const payload = jwt.sign(session, process.env.JWT_TOKEN_KEY)

    emailService.sendVerificationEmail(user.email, payload)
    return user._id
  },

  login: async (userObj) => {
    const user = await userService.getUserByEmail(userObj.email)
    if (!user) {
      throw new EmailNotFound()
    }

    if (!bcrypt.compareSync(userObj.password, user.password)) {
      throw new InvalidAccount()
    }

    if (!user.verified) {
      throw new NotVerifiedAccount()
    }

    const session = { _id: user._id }
    const payload = jwt.sign(session, process.env.JWT_TOKEN_KEY)

    return payload
  },

  verifyAccount: async (token) => {
    const decoded = jwt.decode(token)

    const user = await userService.getUserById(decoded._id)

    if (!user) {
      throw new EmailNotFound()
    }
    await userService.verifyAccount(user._id)
    return true
  },

  sendResetPasswordLink: async (email) => {
    console.log(email)
    const user = await userService.getUserByEmail(email)
    if (!user) {
      throw new EmailNotFound()
    }
    const session = { _id: user._id }
    const payload = jwt.sign(session, process.env.JWT_TOKEN_KEY)

    await emailService.sendResetPasswordLink(email, payload)
    return true
  },
  resetPassword: async (password, token) => {
    const decoded = jwt.decode(token)
    const user = await userService.getUserById(decoded._id)
    if(!user){
      throw new EmailNotFound()
    }

    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.HASH_SALT))

    return await userService.updatePassword(user._id, hashedPassword)
  }
}
