'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.bulkInsert('Projects', [
      // {
      //   name: 'Dai VB',
      //   line:'automotive',
      //   domain: 'Automotive',
      //   description:'123',
      //   active:false,
      //   createdAt:new Date(),
      //   updatedAt:new Date()
      // },
      // {
      //   name: 'MMS',
      //   line:'horizontal',
      //   domain: 'Multimedia solutions',
      //   description:'123',
      //   active:false,
      //   createdAt:new Date(),
      //   updatedAt:new Date()
      // },
      {
        name: 'OSM',
        line:'automotive',
        domain: 'Automotive',
        description:'123',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'T-Vision',
        line:'vertical',
        domain: 'Health',
        description:'123',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'T-Mobile Austria',
        line:'sap',
        domain: 'Telekom',
        description:'123',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'AS1313',
        line:'horizontal',
        domain: 'Public',
        description:'123',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'SBB',
        line:'vertical',
        domain: 'Transportation',
        description:'123',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Sopre AOM',
        line:'vertical',
        domain: 'Transportation',
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


