'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Employees', [{
        firstname: 'Artur',
        lastname: 'Fedorov',
        active:true,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstname: 'Ivan',
        lastname: 'Ivanov',
        active:true,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Employees', [{
       // firstname :'Artur'
      }], {});
  }
};
