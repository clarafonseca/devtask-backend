const { usersRepository } = require('../../repositories')
const { StatusCodes } = require('http-status-codes')
const { messages } = require('../../utils')

module.exports.logout = async (id) => {
  const user = await usersRepository.getById(id)

  if (!user) {
    throw Object.assign(new Error(messages.notFound('user')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  user.setDataValue('token', null)

  return usersRepository.update(user)
}
