'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('project_customer',
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
        customerId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Customers',
            key: 'id'
          },
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }
    )},
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('project_customer')
  }
};
