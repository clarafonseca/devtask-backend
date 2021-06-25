const { Enterprise } = require('../models')

module.exports = {
  getAll: (query) => Enterprise.findAll(query),
  list: (query) => Enterprise.findAndCountAll(query),
  getById: (id) => Enterprise.findByPk(id),
  get: (params) => Enterprise.findOne({ where: params }),
  create: (params) => Enterprise.create(params),
  update: (enterprise) => enterprise.save(),
  destroy: (id) => Enterprise.destroy({ where: { id } })
}
