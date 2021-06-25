const yup = require('yup')
const { StatusCodes } = require('http-status-codes')
const { enterprisesRepository, jobsRepository, categoriesRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.update = async (userId, id, body) => {
  const enterprise = await enterprisesRepository.get({ userId: userId })
  const job = await jobsRepository.get({ id: id, enterpriseId: enterprise.id })

  if (!enterprise || !job) {
    throw Object.assign(new Error(messages.notFound('user-or-job')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const schema = yup.object().shape({
    categoryId: yup.number(),
    title: yup.string(),
    description: yup.string(),
    jobModality: yup.string(),
    location: yup.string(),
    isRemote: yup.bool()
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  if (validated.category != null) {
    const category = await categoriesRepository.getById(validated.categoryId)

    if (!category) {
      throw Object.assign(new Error(messages.notFound('category')), {
        status: StatusCodes.NOT_FOUND
      })
    }
  }

  Object.keys(validated).forEach((key) => {
    job.setDataValue(key, validated[key])
  })

  return await jobsRepository.update(job)
}
