const yup = require('yup')
const { StatusCodes } = require('http-status-codes')
const { messages } = require('../../utils')
const { usersRepository, imagesRepository } = require('../../repositories')

module.exports.update = async (id, body) => {
  const user = await usersRepository.getById(id)

  if (!user) {
    throw Object.assign(new Error(messages.notFound('user')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const schema = yup.object().shape({
    imageId: yup.number(),
    fullName: yup.string(),
    email: yup.string().email()
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  if (validated.email) {
    const checkEmail = await usersRepository.get({ email: validated.email })

    if (checkEmail) {
      throw Object.assign(new Error(messages.emailUnavailable), {
        status: StatusCodes.CONFLICT
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
    user.setDataValue(key, validated[key])
  })

  const userUpdated = await usersRepository.update(user)

  return {
    id: userUpdated.id,
    roleId: userUpdated.roleId,
    imageId: userUpdated.imageId,
    firstName: userUpdated.firstName,
    fullName: userUpdated.fullName,
    email: userUpdated.email
  }
}
