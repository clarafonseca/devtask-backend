const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')

class ResetToken extends Model {}
ResetToken.init(
  {
    email: DataTypes.STRING,
    token: DataTypes.STRING,
    expiration: DataTypes.DATE,
    used: DataTypes.BOOLEAN
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'ResetToken',
    tableName: 'reset_tokens'
  }
)

module.exports = ResetToken
