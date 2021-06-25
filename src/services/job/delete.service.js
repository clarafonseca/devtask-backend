const { StatusCodes } = require('http-status-codes')
const { jobsRepository, enterprisesRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.deleteOne = async (userId, id) => {
  const enterprise = await enterprisesRepository.get({ userId: userId })
  const job = await jobsRepository.get({ id: id, enterpriseId: enterprise.id })

  if (!job) {
    throw Object.assign(new Error(messages.notFound('job')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  if (jobsRepository.destroy(id)) {
    return 'job-deleted'
  }
}
