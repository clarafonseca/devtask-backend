const { StatusCodes } = require('http-status-codes')
const { userService } = require('../services')

module.exports = {
  createTest: async (req, res) => {
    try {
      const response = await userService.createUser(req.body, 3)
      return res.status(StatusCodes.CREATED).json(response)
    } catch (error) {
      console.error(error)
      return res
        .status(
          error.name === 'ValidationError'
            ? StatusCodes.BAD_REQUEST
            : error.status || StatusCodes.INTERNAL_SERVER_ERROR
        )
        .json(error.message)
    }
  },
  list: async (req, res) => {
    try {
      const response = await userService.list(req.query)

      if (!response || response.data.length === 0) {
        return res.status(StatusCodes.NO_CONTENT).end()
      }

      return res.status(StatusCodes.OK).json(response)
    } catch (error) {
      console.error(error)
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message)
    }
  },
  get: async (req, res) => {
    try {
      const response = await userService.get(req.params.id)
      return res.status(StatusCodes.OK).json(response)
    } catch (error) {
      console.error(error)
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message)
    }
  },
  update: async (req, res) => {
    try {
      const response = await userService.update(req.user.id, req.body)
      return res.status(StatusCodes.OK).json(response)
    } catch (error) {
      console.error(error)
      return res
        .status(
          error.name === 'ValidationError'
            ? StatusCodes.BAD_REQUEST
            : error.status || StatusCodes.INTERNAL_SERVER_ERROR
        )
        .json(error.message)
    }
  },
  patch: async (req, res) => {
    try {
      const response = await userService.patch(req.query.token, req.query.email, req.body)
      return res.status(StatusCodes.OK).json(response)
    } catch (error) {
      console.error(error)
      return res
        .status(
          error.name === 'ValidationError'
            ? StatusCodes.BAD_REQUEST
            : error.status || StatusCodes.INTERNAL_SERVER_ERROR
        )
        .json(error.message)
    }
  },
  delete: async (req, res) => {
    try {
      const response = await userService.deleteUser(req.user.id)
      return res.status(StatusCodes.NO_CONTENT).json(response)
    } catch (error) {
      console.error(error)
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message)
    }
  }
}
