'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.bulkInsert('Projects', [{
        name: 'Dai VB',
        line:'automotive',
        domain: 'Automotive',
        description:'123',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'MMS',
        line:'horizontal',
        domain: 'Multimedia solutions',
        description:'123',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Projects', [{
        //name :'Angular 2.x'
      }], {});
    
  }
};


