const { StatusCodes } = require('http-status-codes')
const { projectService } = require('../services')
const { messages } = require('../utils')

module.exports = {
  create: async (req, res) => {
    try {
      if (req.session.role !== 1) {
        throw Object.assign(new Error(messages.accessUnauthorized), {
          status: StatusCodes.FORBIDDEN
        })
      }
      const response = await projectService.create(req.user.id, req.body)
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
  get: async (req, res) => {
    try {
      const response = await projectService.get(req.params.id)
      return res.status(StatusCodes.OK).json(response)
    } catch (error) {
      console.error(error)
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message)
    }
  },
  list: async (req, res) => {
    try {
      const response = await projectService.list(req.query)

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
  update: async (req, res) => {
    try {
      if (req.session.role !== 1) {
        throw Object.assign(new Error(messages.accessUnauthorized), {
          status: StatusCodes.FORBIDDEN
        })
      }
      const response = await projectService.update(req.user.id, req.params.id, req.body)
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
      if (req.session.role !== 1) {
        throw Object.assign(new Error(messages.accessUnauthorized), {
          status: StatusCodes.FORBIDDEN
        })
      }
      const response = await projectService.deleteOne(req.user.id, req.params.id)
      return res.status(StatusCodes.NO_CONTENT).json(response)
    } catch (error) {
      console.error(error)
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message)
    }
  }
}
