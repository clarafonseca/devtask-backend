const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const { messages } = require('../utils')
const { usersRepository } = require('../repositories')

module.exports = async (req, res, next) => {
  try {
    let token

    if (req.headers && req.headers.authorization) {
      const [scheme, credentials] = req.headers.authorization.split(' ')

      if (scheme.match(/^Bearer$/i)) {
        token = credentials
      } else {
        throw Object.assign(new Error(messages.invalidAuthFormat), {
          status: StatusCodes.UNAUTHORIZED
        })
      }
    } else {
      throw Object.assign(new Error(messages.authMissing), {
        status: StatusCodes.UNAUTHORIZED
      })
    }

    const user = await usersRepository.get({ token: token })

    if (!user) {
      throw Object.assign(new Error(messages.accessUnauthorized), {
        status: StatusCodes.BAD_REQUEST
      })
    }

    const verify = promisify(jwt.verify)
    const decoded = await verify(token, process.env.JWT_TOKEN)

    req.session = {
      token,
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    }

    req.user = user

    return next()
  } catch (error) {
    console.error(error)
    return res.status(error.status).json(error.message)
  }
}
