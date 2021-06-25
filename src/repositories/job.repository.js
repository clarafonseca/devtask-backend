const { Job } = require('../models')

module.exports = {
  getAll: (query) => Job.findAll(query),
  list: (query) => Job.findAndCountAll(query),
  getById: (id) => Job.findByPk(id),
  get: (params) => Job.findOne({ where: params }),
  create: (params) => Job.create(params),
  update: (job) => job.save(),
  destroy: (id) => Job.destroy({ where: { id } })
}
