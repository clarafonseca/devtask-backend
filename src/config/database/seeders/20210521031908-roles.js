'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      {
        title: 'developer',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'enterprise',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {})
  }
}
