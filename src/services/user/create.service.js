const yup = require('yup')
const { StatusCodes } = require('http-status-codes')
const { usersRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.createUser = async (body, role) => {
  const schema = yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  const user = await usersRepository.get(
    {
      email: validated.email
    },
    { paranoid: false }
  )

  if (user) {
    throw Object.assign(new Error(messages.emailUnavailable), {
      status: StatusCodes.CONFLICT
    })
  }

  const userCreated = await usersRepository.create({
    roleId: role,
    ...validated
  })

  return {
    id: userCreated.id,
    roleId: userCreated.roleId,
    firstName: userCreated.firstName,
    fullName: userCreated.fullName,
    email: userCreated.email
  }
}
