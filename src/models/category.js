const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')

class Category extends Model {}
Category.init(
  {
    imageId: {
      type: DataTypes.INTEGER,
      field: 'image_id'
    },
    title: DataTypes.STRING
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'Category',
    tableName: 'categories'
  }
)

module.exports = Category
