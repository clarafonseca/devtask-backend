const yup = require('yup')
const { StatusCodes } = require('http-status-codes')
const { enterprisesRepository, jobsRepository, categoriesRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.create = async (id, body) => {
  const enterprise = await enterprisesRepository.get({ userId: id })

  if (!enterprise) {
    throw Object.assign(new Error(messages.notFound('user')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const schema = yup.object().shape({
    categoryId: yup.string().required(),
    title: yup.string().required(),
    description: yup.string(),
    jobModality: yup.string().required(),
    location: yup.string(),
    isRemote: yup.bool().required()
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

  return await jobsRepository.create({
    userId: id,
    enterpriseId: enterprise.id,
    ...validated
  })
}
