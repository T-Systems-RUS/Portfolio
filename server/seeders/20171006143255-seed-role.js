'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.bulkInsert('Roles', [{
        name: 'Tester',
        domain: 'Testing',
        leadrole:false,
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Developer',
        domain: 'Development',
        leadrole:false,
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Roles', [{
        //name :'Angular 2.x'
      }], {});
    
  }
};
