'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('devs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      languages: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      job_modality: {
        type: Sequelize.STRING
      },
      work_experiences: {
        type: Sequelize.STRING
      },
      github: {
        type: Sequelize.STRING
      },
      linkedin: {
        type: Sequelize.STRING(11)
      },
      website: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('devs')
  }
}
