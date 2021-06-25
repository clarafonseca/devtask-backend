const { StatusCodes } = require('http-status-codes')
const { User, Enterprise, Category } = require('../../models')
const { jobsRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.get = async (id) => {
  const job = await jobsRepository.getAll({
    where: {
      id: id
    },
    attributes: { exclude: ['deletedAt', 'UserId', 'EnterpriseId'] },
    include: [{
      model: User,
      attributes: ['id', 'fullName', 'firstName', 'email']
    },
    {
      model: Enterprise,
      attributes: ['id', 'bio', 'website']
    },
    {
      model: Category,
      attributes: ['id', 'title']
    }
    ]
  })

  if (!job) {
    throw Object.assign(new Error(messages.notFound('job')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  return job
}
