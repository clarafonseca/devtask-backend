const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')

class Enterprise extends Model {}
Enterprise.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    cnpj: DataTypes.STRING,
    bio: DataTypes.STRING,
    contact: DataTypes.STRING,
    website: DataTypes.STRING
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'Enterprise',
    tableName: 'enterprises',
    paranoid: true
  }
)

module.exports = Enterprise
