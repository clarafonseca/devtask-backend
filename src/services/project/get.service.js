const { StatusCodes } = require('http-status-codes')
const { User, Dev, Category } = require('../../models')
const { projectsRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.get = async (id) => {
  const project = await projectsRepository.getAll({
    where: {
      id: id
    },
    attributes: { exclude: ['deletedAt', 'UserId', 'DevId'] },
    include: [{
      model: User,
      attributes: ['id', 'fullName', 'firstName', 'email']
    },
    {
      model: Dev,
      attributes: ['id', 'title']
    },
    {
      model: Category,
      attributes: ['id', 'title']
    }
    ]
  })

  if (!project) {
    throw Object.assign(new Error(messages.notFound('project')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  return project
}
