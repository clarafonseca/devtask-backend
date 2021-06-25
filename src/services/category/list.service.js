const { categoriesRepository } = require('../../repositories')

module.exports.list = async (query) => {
  const { count, rows } = await categoriesRepository.list({
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
    where: query
  })

  return {
    metadata: {
      total: count
    },
    data: rows
  }
}
