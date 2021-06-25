const { StatusCodes } = require('http-status-codes')
const { User, Project } = require('../../models')
const { devsRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.get = async (id) => {
  const dev = await devsRepository.getAll({
    where: {
      userId: id
    },
    attributes: { exclude: ['deletedAt', 'UserId'] },
    include: [{
      model: User,
      attributes: ['id', 'fullName', 'firstName', 'email']
    },
    {
      model: Project,
      attributes: { exclude: ['deletedAt', 'DevId', 'UserId', 'CategoryId'] }
    }]
  })

  if (!dev) {
    throw Object.assign(new Error(messages.notFound('user')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  return dev
}
