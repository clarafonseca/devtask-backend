const { createUser } = require('./create.service')
const { list } = require('./list.service')
const { get } = require('./get.service')
const { update } = require('./update.service')
const { patch } = require('./patch.service')
const { deleteUser } = require('./delete.service')

module.exports = {
  createUser,
  list,
  get,
  update,
  patch,
  deleteUser
}
