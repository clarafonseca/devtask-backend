const yup = require('yup')
const { createUser } = require('../user/create.service')
const { enterprisesRepository } = require('../../repositories')
const { User } = require('../../models')
const { StatusCodes } = require('http-status-codes')
const { messages } = require('../../utils')

module.exports.create = async (body) => {
  const regexUrl = {
    regex: /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    msg: 'Enter'
  }

  const schema = yup.object().shape({
    cnpj: yup.string().max(14).min(14).required(),
    bio: yup.string(),
    contact: yup.string().email(),
    website: yup.string().matches(regexUrl.regex, regexUrl.msg)
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  const cnpj = await enterprisesRepository.get(
    {
      cnpj: validated.cnpj
    },
    { paranoid: false }
  )

  if (cnpj) {
    throw Object.assign(new Error(messages.alreadyExists('enterprise')), {
      status: StatusCodes.CONFLICT
    })
  }

  const user = await createUser(body, 2)
  const enterprise = await enterprisesRepository.get(
    {
      userId: user.id
    },
    { paranoid: false }
  )

  if (enterprise) {
    throw Object.assign(new Error(messages.alreadyExists('user')), {
      status: StatusCodes.CONFLICT
    })
  }

  const enterpriseCreated = await enterprisesRepository.create({
    userId: user.id,
    ...validated
  })

  return await enterprisesRepository.getAll({
    where: {
      id: enterpriseCreated.id
    },
    attributes: { exclude: ['deletedAt', 'UserId'] },
    include: [{
      model: User,
      attributes: ['id', 'fullName', 'firstName', 'email']
    }]
  })
}
