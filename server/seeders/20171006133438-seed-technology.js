'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.bulkInsert('Technologies', [{
        name: 'Angular 2.x',
        domain: 'frontend',
        active:true,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Java 1.8',
        domain: 'backend',
        active:true,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Technologies', [{
        name :'Angular 2.x'
      }], {});
    
  }
};
