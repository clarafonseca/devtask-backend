const { Image } = require('../models')

module.exports = {
  getAll: (query) => Image.findAll(query),
  list: (query) => Image.findAndCountAll(query),
  getById: (id) => Image.findByPk(id),
  get: (params) => Image.findOne({ where: params }),
  create: (params) => Image.create(params),
  update: (image) => image.save(),
  destroy: (id) => Image.destroy({ where: { id } })
}
