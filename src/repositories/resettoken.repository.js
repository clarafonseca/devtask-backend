const { ResetToken } = require('../models')

module.exports = {
  list: (params) => ResetToken.findAll({ where: params }),
  get: (params) => ResetToken.findOne({ where: params }),
  create: (params) => ResetToken.create(params),
  update: (resetToken) => resetToken.save(),
  destroy: (email) => ResetToken.destroy({ where: { email } })
}
