const { imagesRepository } = require('../../repositories')

module.exports.list = async (query) => {
  const { count, rows } = await imagesRepository.list({
    attributes: { exclude: ['createdAt', 'updatedAt', 'UserId'] },
    where: query
  })

  return {
    metadata: {
      total: count
    },
    data: rows
  }
}
