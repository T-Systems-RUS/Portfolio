'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('Lines',
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
          active: {
            defaultValue:false,
            type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Lines');
  }
};
