'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Employees', [
      {
        firstname: 'Artur',
        lastname: 'Fedorov',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstname: 'Ivan',
        lastname: 'Ivanov',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstname: 'Sergei',
        lastname: 'Sergeev',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstname: 'Anton',
        lastname: 'Antonov',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstname: 'Petr',
        lastname: 'Petrov',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstname: 'Semen',
        lastname: 'Semenov',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstname: 'Fedor',
        lastname: 'Fedorov',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstname: 'Ilya',
        lastname: 'Iliin',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Employees', [{
       // firstname :'Artur'
      }], {});
  }
};
