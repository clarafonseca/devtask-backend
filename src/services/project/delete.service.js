const { StatusCodes } = require('http-status-codes')
const { projectsRepository, devsRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.deleteOne = async (userId, id) => {
  const dev = await devsRepository.get({ userId: userId })
  const project = await projectsRepository.get({ id: id, devId: dev.id })

  if (!project) {
    throw Object.assign(new Error(messages.notFound('project')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  if (projectsRepository.destroy(id)) {
    return 'project-deleted'
  }
}
