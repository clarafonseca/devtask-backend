const { StatusCodes } = require('http-status-codes')
const { User, Job } = require('../../models')
const { enterprisesRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.get = async (id) => {
  const enterprise = await enterprisesRepository.getAll({
    where: {
      userId: id
    },
    attributes: { exclude: ['deletedAt', 'UserId'] },
    include: [{
      model: User,
      attributes: ['id', 'fullName', 'firstName', 'email']
    },
    {
      model: Job,
      attributes: { exclude: ['deletedAt', 'EnterpriseId', 'UserId', 'CategoryId'] }
    }]
  })

  if (!enterprise) {
    throw Object.assign(new Error(messages.notFound('user')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  return enterprise
}
