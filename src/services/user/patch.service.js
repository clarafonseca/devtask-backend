const yup = require('yup')
const { StatusCodes } = require('http-status-codes')
const { messages } = require('../../utils')
const { usersRepository, resetTokenRepository } = require('../../repositories')

module.exports.patch = async (token, email, body) => {
  const resetToken = await resetTokenRepository.get({ token: token, email: email })

  if (!resetToken) {
    throw Object.assign(new Error(messages.notFound('request')), {
      status: StatusCodes.UNAUTHORIZED
    })
  }

  const currentDate = new Date()

  if (resetToken.used === true) {
    throw Object.assign(new Error(messages.accessUnauthorized), {
      status: StatusCodes.UNAUTHORIZED
    })
  } else if (resetToken.expiration < currentDate) {
    throw Object.assign(new Error(messages.tokenExpired), {
      status: StatusCodes.UNAUTHORIZED
    })
  }

  const user = await usersRepository.get({ email: email })

  if (!user) {
    throw Object.assign(new Error(messages.notFound('user')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const schema = yup.object().shape({
    password: yup.string().required(),
    confirmPass: yup.string().required()
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  if (validated.password !== validated.confirmPass) {
    throw Object.assign(new Error(messages.invalidFields), {
      status: StatusCodes.UNPROCESSABLE_ENTITY
    })
  }

  user.setDataValue('password', validated.password)
  const userUpdated = await usersRepository.update(user)

  resetToken.setDataValue('used', true)
  await resetTokenRepository.update(resetToken)

  return {
    firstName: userUpdated.firstName,
    fullName: userUpdated.fullName,
    email: userUpdated.email
  }
}
