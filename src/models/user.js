const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')
const { encryptor } = require('../utils')

class User extends Model {}
User.init(
  {
    imageId: {
      type: DataTypes.INTEGER,
      field: 'image_id'
    },
    roleId: {
      type: DataTypes.INTEGER,
      field: 'role_id'
    },
    fullName: {
      type: DataTypes.STRING,
      field: 'full_name',
      set (value) {
        this.setDataValue('fullName', value.replace(/\b\w/g, l => l.toUpperCase()))
      }
    },
    firstName: {
      type: DataTypes.VIRTUAL,
      get () {
        const firstName = this.fullName.split(' ')[0]
        return firstName
      }
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'User',
    tableName: 'users',
    paranoid: true
  }
)

User.beforeSave(async (user, options) => {
  const password = await encryptor.hashPassword(user.password)
  if (user.changed('password')) {
    Object.assign(user, { password })
  }
  return user
})

User.prototype.toJSON = function () {
  const user = { ...this.get() }
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !['password'].includes(key))
  )
}

module.exports = User
