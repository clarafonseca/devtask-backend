'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        role_id: 3,
        full_name: 'Adminisitrador Devtask',
        email: 'admin@devtask.com',
        password:
          '$2y$08$EEDkHQR4jJiCprUHUZXlHeuK3h5Hb27Lcufd5kbev/tnrjxCBZNUm',
        token: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
