'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Types', [
      {
        name: 'Project',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Service',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Types', [{
      //name :'Angular 2.x'
    }], {});

  }
};
