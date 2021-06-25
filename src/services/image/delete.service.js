const { StatusCodes } = require('http-status-codes')
const { imagesRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.deleteOne = async (userId, imageId) => {
  const image = await imagesRepository.get({ userId: userId, id: imageId })

  if (!image) {
    throw Object.assign(new Error(messages.notFound('image')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const imageDeleted = imagesRepository.destroy(imageId)
  if (imageDeleted) {
    return 'image-deleted'
  }
}
