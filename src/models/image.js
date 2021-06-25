const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')
const aws = require('aws-sdk')
const s3 = new aws.S3()
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

class Image extends Model {}
Image.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    key: DataTypes.STRING,
    url: DataTypes.STRING
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'Image',
    tableName: 'images'
  }
)

Image.beforeSave(async (image, options) => {
  if (!image.url) {
    image.url = `${process.env.DOMAIN}/files/${image.key}`
  }
  return image
})

Image.beforeDestroy(async (image, options) => {
  if (process.env.STORAGE_TYPE === 's3') {
    return s3.deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: image.key
    }).promise()
  } else {
    return promisify(fs.unlink)(path.resolve(__dirname, '..', 'tmp', 'uploads', image.key))
  }
})

module.exports = Image
