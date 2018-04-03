'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Domains', [
      {
        name: 'Automotive',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Content management',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Health',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Transportation',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Public',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Logistics',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Domains', [{
      //name :'Angular 2.x'
    }], {});

  }
};
