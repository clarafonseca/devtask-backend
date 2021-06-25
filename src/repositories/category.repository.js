const { Category } = require('../models')

module.exports = {
  getAll: (query) => Category.findAll(query),
  list: (query) => Category.findAndCountAll(query),
  getById: (id) => Category.findByPk(id),
  get: (params) => Category.findOne({ where: params }),
  create: (params) => Category.create(params),
  update: (category) => category.save(),
  destroy: (id) => Category.destroy({ where: { id } })
}
