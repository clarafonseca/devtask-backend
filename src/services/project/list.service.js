const { Op } = require('sequelize')
const { projectsRepository } = require('../../repositories')
const { Category, User } = require('../../models')

module.exports.list = async (query) => {
  const search = query.search ? query.search : ''
  const category = query.category ? query.category : ''

  const { count, rows } = await projectsRepository.list({
    include: [{
      model: User,
      attributes: ['id', 'fullName']
    },
    {
      model: Category,
      attributes: ['id', 'title'],
      where: {
        title: {
          [Op.iLike]: `%${category}%`
        }
      }
    }],
    attributes: ['id', 'devId', 'title', 'description', 'createdAt'],
    where: {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${search}%`
          }
        },
        {
          description: {
            [Op.iLike]: `%${search}%`
          }
        }
      ]
    },
    order: [['createdAt', 'DESC']]
  })

  return {
    metadata: {
      total: count
    },
    data: rows
  }
}
