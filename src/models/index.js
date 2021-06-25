const Sequelize = require('sequelize')
const config = require('../config/database/sequelize')
const User = require('./user')
const Role = require('./role')
const Dev = require('./dev')
const ResetToken = require('./resettoken')
const Category = require('./category')
const Project = require('./project')
const Enterprise = require('./enterprise')
const Job = require('./job')
const Image = require('./image')

Role.hasMany(User)
User.hasOne(Role)

User.hasOne(Dev)
User.hasOne(Enterprise)
Dev.belongsTo(User)
Enterprise.belongsTo(User)

User.hasMany(Project)
Dev.hasMany(Project)
Project.belongsTo(User)
Project.belongsTo(Category)
Project.belongsTo(Dev)

User.hasMany(Job)
Enterprise.hasMany(Job)
Job.belongsTo(User)
Job.belongsTo(Category)
Job.belongsTo(Enterprise)

Image.belongsTo(User)
Category.hasHook(Image)
Image.belongsTo(Category)

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

module.exports = {
  sequelize,
  User,
  Role,
  Dev,
  ResetToken,
  Category,
  Project,
  Enterprise,
  Job,
  Image
}
