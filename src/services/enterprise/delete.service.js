const { StatusCodes } = require('http-status-codes')
const { enterprisesRepository, usersRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.deleteOne = async (id) => {
  const enterprise = await enterprisesRepository.get({ userId: id })

  if (!enterprise) {
    throw Object.assign(new Error(messages.notFound('enterprise')), {
      status: StatusCodes.NOT_FOUND
    })
  }
  const userDeleted = usersRepository.destroy(id)
  const enterpriseDeleted = enterprisesRepository.destroy(enterprise.id)
  if (enterpriseDeleted && userDeleted) {
    return 'enterprise-deleted'
  }
}
