'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('Programs',
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
        lineId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Lines',
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
    return queryInterface.dropTable('Programs');
  }
};
