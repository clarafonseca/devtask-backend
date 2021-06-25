const yup = require('yup')
const { StatusCodes } = require('http-status-codes')
const { devsRepository, projectsRepository, categoriesRepository, imagesRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.update = async (userId, id, body) => {
  const dev = await devsRepository.get({ userId: userId })
  const project = await projectsRepository.get({ id: id, devId: dev.id })

  if (!dev || !project) {
    throw Object.assign(new Error(messages.notFound('user-or-project')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const schema = yup.object().shape({
    imageId: yup.number(),
    categoryId: yup.number(),
    title: yup.string(),
    description: yup.string()
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  if (validated.categoryId != null) {
    const category = await categoriesRepository.getById(validated.categoryId)

    if (!category) {
      throw Object.assign(new Error(messages.notFound('category')), {
        status: StatusCodes.NOT_FOUND
      })
    }
  }

  if (validated.imageId) {
    const image = await imagesRepository.get({ id: validated.imageId, userId: id })

    if (!image) {
      throw Object.assign(new Error(messages.notFound('image')), {
        status: StatusCodes.NOT_FOUND
      })
    }
  }

  Object.keys(validated).forEach((key) => {
    project.setDataValue(key, validated[key])
  })

  const projectUpdated = await projectsRepository.update(project)

  return {
    devId: dev.id,
    imageId: projectUpdated.imageId,
    id: projectUpdated.id,
    title: projectUpdated.title,
    categoryId: projectUpdated.categoryId,
    description: projectUpdated.description
  }
}
