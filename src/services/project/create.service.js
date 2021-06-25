const yup = require('yup')
const { StatusCodes } = require('http-status-codes')
const { devsRepository, projectsRepository, categoriesRepository, imagesRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.create = async (id, body) => {
  const dev = await devsRepository.get({ userId: id })

  if (!dev) {
    throw Object.assign(new Error(messages.notFound('user')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const schema = yup.object().shape({
    imageId: yup.number(),
    categoryId: yup.number().required(),
    title: yup.string().required(),
    description: yup.string()
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  const category = await categoriesRepository.getById(validated.categoryId)

  if (!category) {
    throw Object.assign(new Error(messages.notFound('category')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  if (validated.imageId) {
    const image = await imagesRepository.get({ id: validated.imageId, userId: id })

    if (!image) {
      throw Object.assign(new Error(messages.notFound('image')), {
        status: StatusCodes.NOT_FOUND
      })
    }
  }

  return await projectsRepository.create({
    userId: id,
    devId: dev.id,
    ...validated
  })
}
