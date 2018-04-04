'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const domains = await queryInterface.sequelize.query(
      'Select id from "Domains"'
    );

    const programs = await queryInterface.sequelize.query(
      'Select id from "Programs"'
    );

    const types = await queryInterface.sequelize.query(
      'Select id from "Types"'
    );

    const domainRows = domains[0];
    const programRows = programs[0];
    const typeRows = types[0];

    return await queryInterface.bulkInsert('Projects', [
      {
        name: 'PPA',
        programId: programRows[1].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'BMW PFS',
        programId: programRows[0].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'BMW OSM',
        programId: programRows[0].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'LogiWeb_ContiEOBR',
        programId: programRows[1].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'SBB',
        programId: programRows[10].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'SOPRE',
        programId: programRows[10].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'T-Mobile Austria',
        programId: programRows[5].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'AMS Truck',
        programId: programRows[2].id,
        domainId: domainRows[0].id,
        typeId: typeRows[1].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Integration Layer',
        programId: programRows[4].id,
        domainId: domainRows[1].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'BMW PFS',
        programId: programRows[0].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        pss: 5,
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


