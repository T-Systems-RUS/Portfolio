'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('Customers',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        image: {
          allowNull: true,
          type: Sequelize.STRING
        },
        active: {
          defaultValue:false,
          type: Sequelize.BOOLEAN
        },
        domainId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Domains',
            key: 'id'
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Customers');
  }
};

