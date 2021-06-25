const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')

class Job extends Model {}
Job.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    enterpriseId: {
      type: DataTypes.INTEGER,
      field: 'enterprise_id'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id'
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING(500),
    jobModality: {
      type: DataTypes.STRING,
      field: 'job_modality'
    },
    location: DataTypes.STRING,
    isRemote: {
      type: DataTypes.BOOLEAN,
      field: 'is_remote'
    }
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'Job',
    tableName: 'jobs',
    paranoid: true
  }
)

module.exports = Job
