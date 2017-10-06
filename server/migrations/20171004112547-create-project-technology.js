module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('project_technology',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          projectId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Projects',
              key: 'id'
            },
            allowNull: false
          },
          technologyId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Technologies',
              key: 'id'
            },
            allowNull: false
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
        }
    )},
  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('project_technology')
    }
  };