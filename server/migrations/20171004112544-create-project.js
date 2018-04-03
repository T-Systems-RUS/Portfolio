'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      customer: {
        type: Sequelize.STRING
      },
      domainId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Domains',
          key: 'id'
        },
      },
      typeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Types',
          key: 'id'
        },
      },
      programId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Programs',
          key: 'id'
        },
      },
      pss: {
        type: Sequelize.DECIMAL
      },
      feedback: {
        type: Sequelize.TEXT,
        validate: { len: [0,100000] }
      },
      description: {
        type: Sequelize.TEXT,
        validate: { len: [0,100000] }
      },
      image: {
        type: Sequelize.STRING
      },
      version: {
        defaultValue:1,
        type: Sequelize.INTEGER
      },
      active: {
        defaultValue:false,
        type: Sequelize.BOOLEAN
      },
      ishistory: {
        defaultValue:false,
        type: Sequelize.BOOLEAN
      },
      startdate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      enddate: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('Projects');
  }
};
