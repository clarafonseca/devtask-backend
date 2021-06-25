const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')

class Project extends Model {}
Project.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    devId: {
      type: DataTypes.INTEGER,
      field: 'dev_id'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id'
    },
    imageId: {
      type: DataTypes.INTEGER,
      field: 'image_id'
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING(500)
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'Project',
    tableName: 'projects',
    paranoid: true
  }
)

module.exports = Project
