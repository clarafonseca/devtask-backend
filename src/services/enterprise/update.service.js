const yup = require('yup')
const { StatusCodes } = require('http-status-codes')
const { User } = require('../../models')
const { messages } = require('../../utils')
const { enterprisesRepository } = require('../../repositories')

module.exports.update = async (id, body) => {
  console.log(id)
  const enterprise = await enterprisesRepository.get({ userId: id })

  if (!enterprise) {
    throw Object.assign(new Error(messages.notFound('enterprise')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const regexUrl = {
    regex: /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    msg: 'Enter a valid url'
  }

  const schema = yup.object().shape({
    bio: yup.string(),
    contact: yup.string().email(),
    website: yup.string().matches(regexUrl.regex, regexUrl.msg)
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  Object.keys(validated).forEach((key) => {
    enterprise.setDataValue(key, validated[key])
  })

  const enterpriseUpdated = await enterprisesRepository.update(enterprise)

  return await enterprisesRepository.getAll({
    where: {
      id: enterpriseUpdated.id
    },
    attributes: { exclude: ['deletedAt', 'UserId'] },
    include: [{
      model: User,
      attributes: ['id', 'fullName', 'firstName', 'email']
    }]
  })
}
