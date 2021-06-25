const yup = require('yup')
const { Op } = require('sequelize')
const { StatusCodes } = require('http-status-codes')
const { messages } = require('../../utils')
const { categoriesRepository } = require('../../repositories')

module.exports.update = async (id, body) => {
  const category = await categoriesRepository.getById(id)

  if (!category) {
    throw Object.assign(new Error(messages.notFound('category')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const schema = yup.object().shape({
    imageId: yup.number(),
    title: yup.string()
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  const checkTitle = await categoriesRepository.get({
    title: { [Op.iLike]: validated.title }
  })

  if (checkTitle) {
    throw Object.assign(new Error(messages.alreadyExists('category')), {
      status: StatusCodes.CONFLICT
    })
  }

  category.setDataValue('title', validated.title)

  const categoryUpdated = await categoriesRepository.update(category)

  return {
    id: categoryUpdated.id,
    imageId: categoryUpdated.imageId,
    title: categoryUpdated.title
  }
}
