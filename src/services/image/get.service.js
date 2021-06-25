const { StatusCodes } = require('http-status-codes')
const { User } = require('../../models')
const { imagesRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.get = async (id) => {
  const image = await imagesRepository.getAll({
    where: {
      id: id
    },
    attributes: { exclude: ['deletedAt', 'UserId'] },
    include: [{
      model: User,
      attributes: ['id', 'fullName', 'firstName', 'email']
    }]
  })

  if (!image) {
    throw Object.assign(new Error(messages.notFound('image')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  return image
}
