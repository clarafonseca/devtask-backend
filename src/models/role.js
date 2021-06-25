const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')

class Role extends Model {}
Role.init(
  {
    title: DataTypes.STRING
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'Role',
    tableName: 'roles'
  }
)

module.exports = Role
