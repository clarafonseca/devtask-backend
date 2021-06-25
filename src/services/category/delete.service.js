const { StatusCodes } = require('http-status-codes')
const { categoriesRepository } = require('../../repositories')
const { messages } = require('../../utils')
const yup = require('yup')

module.exports.deleteOne = async (id) => {
  const schema = yup.number().required()

  const validated = await schema.validate(id, {
    stripUnknown: true
  })
  const category = await categoriesRepository.getById(validated.id)

  if (!category) {
    throw Object.assign(new Error(messages.notFound('category')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  if (categoriesRepository.destroy(validated.id)) {
    return 'category-deleted'
  }
}
