module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn('users', 'image_id', Sequelize.INTEGER, {
        allowNull: true,
        references: {
          model: 'images',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }),
      queryInterface.addColumn('projects', 'image_id', Sequelize.INTEGER, {
        allowNull: true,
        references: {
          model: 'images',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }),
      queryInterface.addColumn('categories', 'image_id', Sequelize.INTEGER, {
        allowNull: true,
        references: {
          model: 'images',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    ]),
  down: (queryInterface) =>
    Promise.all([
      queryInterface.removeColumn('users', 'image_id'),
      queryInterface.removeColumn('projects', 'image_id'),
      queryInterface.removeColumn('categories', 'image_id')
    ])
}
