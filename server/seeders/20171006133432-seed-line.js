'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Lines', [
      {
        name: 'Automotive',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Digital Integration',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'SAP',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Lines', [{
      //name :'Angular 2.x'
    }], {});

  }
};
