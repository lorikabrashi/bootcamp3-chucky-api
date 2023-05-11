const { InvalidToken } = require('../lib/errors')
const jwt = require('jsonwebtoken')
const userService = require('../services/user.service')
module.exports = {
  checkAuth: async (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
      throw new InvalidToken()
    }
    token = token.split('Bearer ')[1]
    if (!token) {
      throw new InvalidToken()
    }

    jwt.verify(token, process.env.JWT_TOKEN_KEY)

    const decoded = jwt.decode(token)

    const user = await userService.getUserById(decoded._id)
    if (!user) {
      throw new InvalidToken()
    }

    req.userID = decoded._id    
    next()
  },
}
