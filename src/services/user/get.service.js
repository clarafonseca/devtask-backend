const { StatusCodes } = require('http-status-codes')
const { usersRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.get = async (id) => {
  const user = await usersRepository.getById(id)

  if (!user) {
    throw Object.assign(new Error(messages.notFound('user')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  return {
    id: user.id,
    roleId: user.roleId,
    firstName: user.firstName,
    fullName: user.fullName,
    email: user.email
  }
}
