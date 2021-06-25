const { StatusCodes } = require('http-status-codes')
const { authService } = require('../services')

module.exports = {
  login: async (req, res) => {
    try {
      const response = await authService.login(req.body)
      return res.status(StatusCodes.OK).json(response).setHeader('Authorization', response.token)
    } catch (error) {
      console.error(error)
      return res
        .status(
          error.name === 'ValidationError'
            ? StatusCodes.UNPROCESSABLE_ENTITY
            : error.status || StatusCodes.INTERNAL_SERVER_ERROR
        )
        .json(error.message)
    }
  },
  logout: async (req, res) => {
    try {
      const response = await authService.logout(req.user.id)
      return res.status(StatusCodes.NO_CONTENT).json(response)
    } catch (error) {
      console.error(error)
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message)
    }
  },
  resetPassword: async (req, res) => {
    try {
      const response = await authService.resetPass(req.body)
      return res.status(StatusCodes.NO_CONTENT).json(response)
    } catch (error) {
      console.error(error)
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message)
    }
  }
}
