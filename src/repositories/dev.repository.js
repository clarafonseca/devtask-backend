const { Dev } = require('../models')

module.exports = {
  getAll: (query) => Dev.findAll(query),
  list: (query) => Dev.findAndCountAll(query),
  getById: (id) => Dev.findByPk(id),
  get: (params) => Dev.findOne({ where: params }),
  create: (params) => Dev.create(params),
  update: (dev) => dev.save(),
  destroy: (id) => Dev.destroy({ where: { id } })
}
