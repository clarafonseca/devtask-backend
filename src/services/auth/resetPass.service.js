const yup = require('yup')
const crypto = require('crypto')
const { usersRepository, resetTokenRepository } = require('../../repositories')
const { StatusCodes } = require('http-status-codes')
const { sendEmail } = require('../../middlewares')
const { messages } = require('../../utils')

module.exports.resetPass = async (body) => {
  const schema = yup.object().shape({
    email1: yup.string().required().email(),
    email2: yup.string().required()
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  if (validated.email1 !== validated.email2) {
    throw Object.assign(new Error(messages.invalidFields), {
      status: StatusCodes.UNPROCESSABLE_ENTITY
    })
  }

  const email = await usersRepository.get({ email: validated.email1 })

  if (!email) {
    throw Object.assign(new Error(messages.notFound('email')), {
      status: StatusCodes.OK
    })
  }

  await resetTokenRepository.destroy(validated.email1)

  const token = crypto.randomBytes(64).toString('base64')

  const expireDate = new Date()
  expireDate.setHours(expireDate.getHours() + 1)

  await resetTokenRepository.create({
    email: validated.email1,
    expiration: expireDate,
    token: token,
    used: false
  })

  const message = {
    user: validated.email1,
    subject: 'Link para resetar sua senha',
    text: 'To reset your password, please click the link below.\n\nhttps://' + process.env.DOMAIN + '/user/reset-password?token=' + encodeURIComponent(token) + '&email=' + validated.email1
  }
  return sendEmail(message)
}
