const { StatusCodes } = require('http-status-codes')
const { imagesRepository, usersRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.create = async (id, file) => {
  const user = await usersRepository.getById(id)

  if (!user) {
    throw Object.assign(new Error(messages.notFound('user')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const { originalname: name, size, key, location: url = '' } = file

  return await imagesRepository.create({
    userId: user.id,
    name: name,
    size: size,
    key: key,
    url: url
  })
}
