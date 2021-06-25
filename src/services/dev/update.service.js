const yup = require('yup')
const { StatusCodes } = require('http-status-codes')
const { User } = require('../../models')
const { messages } = require('../../utils')
const { devsRepository } = require('../../repositories')

module.exports.update = async (id, body) => {
  console.log(id)
  const dev = await devsRepository.get({ userId: id })

  if (!dev) {
    throw Object.assign(new Error(messages.notFound('dev')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const regexUrl = {
    regex: /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    msg: 'Enter a valid url'
  }

  const schema = yup.object().shape({
    title: yup.string(),
    bio: yup.string(),
    website: yup.string().matches(regexUrl.regex, regexUrl.msg),
    linkedin: yup.string().matches(regexUrl.regex, regexUrl.msg),
    github: yup.string().matches(regexUrl.regex, regexUrl.msg)
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  Object.keys(validated).forEach((key) => {
    dev.setDataValue(key, validated[key])
  })

  const devUpdated = await devsRepository.update(dev)

  return await devsRepository.getAll({
    where: {
      id: devUpdated.id
    },
    attributes: { exclude: ['deletedAt', 'UserId'] },
    include: [{
      model: User,
      attributes: ['id', 'fullName', 'firstName', 'email']
    }]
  })
}
