const { usersRepository } = require('../../repositories')

module.exports.list = async (query) => {
  const { count, rows } = await usersRepository.list({
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'RoleId'] },
    where: query
  })

  return {
    metadata: {
      total: count
    },
    data: rows
  }
}
