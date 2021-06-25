const { StatusCodes } = require('http-status-codes')
const { devService } = require('../services')

module.exports = {
  create: async (req, res) => {
    try {
      const response = await devService.create(req.body)
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
      const response = await devService.list(req.query)

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
      const response = await devService.get(req.params.userId)
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
      const response = await devService.update(req.user.id, req.body)
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
      const response = await devService.deleteOne(req.user.id)
      return res.status(StatusCodes.NO_CONTENT).json(response)
    } catch (error) {
      console.error(error)
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message)
    }
  }
}
