'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.bulkInsert('Projects', [
      {
        name: 'Dai VB',
        line:'automotive',
        domain: 'Automotive',
        description:'123',
        active:false,
        type:'Project',
        program:'Sales and Aftersales',
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'MMS',
        line:'digital integration',
        domain: 'Multimedia solutions',
        description:'123',
        active:false,
        type:'Project',
        program:'Sales and Aftersales',
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'OSM',
        line:'automotive',
        domain: 'Automotive',
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        type:'Project',
        program:'Sales and Aftersales',
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'T-Vision',
        line:'digital integration',
        domain: 'Health',
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        type:'Project',
        program:'Sales and Aftersales',
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'T-Mobile Austria',
        line:'sap',
        domain: 'Telekom',
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        type:'Project',
        program:'Sales and Aftersales',
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'AS1313',
        line:'digital integration',
        domain: 'Public',
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        type:'Project',
        program:'Sales and Aftersales',
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'SBB',
        line:'digital integration',
        domain: 'Transportation',
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        type:'Project',
        program:'Sales and Aftersales',
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Sopre AOM',
        line:'digital integration',
        domain: 'Transportation',
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        type:'Project',
        program:'Sales and Aftersales',
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'PPA',
        line:'automotive',
        domain: 'Automotive',
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        type:'Project',
        program:'Sales and Aftersales',
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Aeroports',
        line:'digital integration',
        domain: 'Transportation',
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        type:'Project',
        program:'Sales and Aftersales',
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'DFMG',
        line:'digital integration',
        domain: 'Health',
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        type:'Project',
        program:'Sales and Aftersales',
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Strabag',
        line:'sap',
        domain: 'public',
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        type:'Project',
        program:'Sales and Aftersales',
        startdate: new Date(),
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


