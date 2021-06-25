const { Op } = require('sequelize')
const { enterprisesRepository } = require('../../repositories')
const { User } = require('../../models')

module.exports.list = async (query) => {
  const search = query.search ? query.search : ''

  const { count, rows } = await enterprisesRepository.list({
    include: [
      {
        model: User,
        where: {
          fullName: {
            [Op.iLike]: `%${search}%`
          }
        },
        attributes: ['id', 'fullName']
      }
    ],
    attributes: { exclude: ['deletedAt', 'UserId'] },
    order: [['createdAt', 'DESC']]
  })

  return {
    metadata: {
      total: count
    },
    data: rows
  }
}
