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
      line: {
        type: Sequelize.STRING
      },
      customer: {
        type: Sequelize.STRING
      },
      domain: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      program: {
        type: Sequelize.STRING
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
      teamcount: {
        defaultValue:"0",
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