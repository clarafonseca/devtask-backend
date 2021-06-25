const { StatusCodes } = require('http-status-codes')
const { categoriesRepository } = require('../../repositories')
const { Image } = require('../../models')
const { messages } = require('../../utils')

module.exports.get = async (id) => {
  const category = await categoriesRepository.getAll({
    where: {
      id: id
    },
    attributes: { exclude: ['deletedAt'] },
    include: [{
      model: Image,
      attributes: { exclude: ['deletedAt'] }
    }]
  })

  if (!category) {
    throw Object.assign(new Error(messages.notFound('category')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  return category
}
