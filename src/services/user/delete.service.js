const { StatusCodes } = require('http-status-codes')
const { usersRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.deleteUser = async (id) => {
  const user = await usersRepository.getById(id)

  if (!user) {
    throw Object.assign(new Error(messages.notFound('user')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const userDeleted = usersRepository.destroy(id)
  if (userDeleted) {
    return 'user-deleted'
  }
}
