const yup = require('yup')
const { Op } = require('sequelize')
const { StatusCodes } = require('http-status-codes')
const { categoriesRepository, imagesRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.create = async (body) => {
  const schema = yup.object().shape({
    imageId: yup.number(),
    title: yup.string().required()
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  const category = await categoriesRepository.get({
    title: { [Op.iLike]: validated.title }
  })

  if (category) {
    throw Object.assign(new Error(messages.alreadyExists('category')), {
      status: StatusCodes.CONFLICT
    })
  }

  const image = await imagesRepository.getById(validated.imageId)

  if (image) {
    throw Object.assign(new Error(messages.notFound('image')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const categoryCreated = await categoriesRepository.create(validated)

  return {
    id: categoryCreated.id,
    imageId: categoryCreated.imageId,
    title: categoryCreated.title
  }
}
