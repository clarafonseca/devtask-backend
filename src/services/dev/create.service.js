const yup = require('yup')
const { createUser } = require('../user/create.service')
const { devsRepository } = require('../../repositories')
const { User } = require('../../models')
const { StatusCodes } = require('http-status-codes')
const { messages } = require('../../utils')

module.exports.create = async (body) => {
  const regexUrl = {
    regex: /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    msg: 'Enter'
  }

  const schema = yup.object().shape({
    title: yup.string(),
    bio: yup.string(),
    location: yup.string(),
    languages: yup.string(),
    contact: yup.string().email(),
    jobModality: yup.string(),
    workExperiences: yup.string().max(500),
    website: yup.string().matches(regexUrl.regex, regexUrl.msg),
    linkedin: yup.string().matches(regexUrl.regex, regexUrl.msg),
    github: yup.string().matches(regexUrl.regex, regexUrl.msg)
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  const user = await createUser(body, 1)

  const dev = await devsRepository.get(
    {
      userId: user.id
    },
    { paranoid: false }
  )

  if (dev) {
    throw Object.assign(new Error(messages.alreadyExists('user')), {
      status: StatusCodes.CONFLICT
    })
  }

  const devCreated = await devsRepository.create({
    userId: user.id,
    ...validated
  })

  return await devsRepository.getAll({
    where: {
      id: devCreated.id
    },
    attributes: { exclude: ['deletedAt', 'UserId'] },
    include: [{
      model: User,
      attributes: ['id', 'fullName', 'firstName', 'email']
    }]
  })
}
