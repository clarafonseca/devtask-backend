const { StatusCodes } = require('http-status-codes')
const { refugeesRepository, usersRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.deleteOne = async (id) => {
  const refugee = await refugeesRepository.get({ userId: id })

  if (!refugee) {
    throw Object.assign(new Error(messages.notFound('refugee')), {
      status: StatusCodes.NOT_FOUND
    })
  }
  const userDeleted = usersRepository.destroy(id)
  const refugeeDeleted = refugeesRepository.destroy(refugee.id)
  if (refugeeDeleted && userDeleted) {
    return 'refugee-deleted'
  }
}
