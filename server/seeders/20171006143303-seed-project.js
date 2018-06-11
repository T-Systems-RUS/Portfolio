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
        uniqueId: 1,
        programId: programRows[1].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        ishistory: false,
        image: 'image-PPA.png',
        pss: 5,
        version: 2,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'BMW PFS',
        uniqueId: 2,
        programId: programRows[0].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        ishistory: false,
        image: 'image-AS1313.jpg',
        pss: 5,
        startdate: new Date('2017-12-17T03:24:00'),
        enddate: new Date('2017-12-25T03:24:00'),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'BMW OSM',
        uniqueId: 3,
        programId: programRows[0].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        ishistory: false,
        image: 'image-AS1313.jpg',
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'LogiWeb_ContiEOBR',
        uniqueId: 4,
        programId: programRows[1].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        ishistory: false,
        image: 'image-AS1313.jpg',
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'SBB',
        uniqueId: 5,
        programId: programRows[10].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        ishistory: false,
        image: 'image-AS1313.jpg',
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'SOPRE',
        uniqueId: 6,
        programId: programRows[10].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        ishistory: false,
        image: 'image-AS1313.jpg',
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'T-Mobile Austria',
        uniqueId: 7,
        programId: programRows[5].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        ishistory: false,
        image: 'image-AS1313.jpg',
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'AMS Truck',
        uniqueId: 8,
        programId: programRows[2].id,
        domainId: domainRows[0].id,
        typeId: typeRows[1].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        ishistory: false,
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Integration Layer',
        uniqueId: 9,
        programId: programRows[4].id,
        domainId: domainRows[1].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        ishistory: false,
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'VPS',
        uniqueId: 10,
        programId: programRows[0].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        ishistory: false,
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'PPA',
        uniqueId: 1,
        programId: programRows[1].id,
        domainId: domainRows[0].id,
        typeId: typeRows[0].id,
        description:'Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online',
        active:false,
        ishistory: true,
        image: 'image-PPA.png',
        version: 1,
        pss: 5,
        startdate: new Date(),
        createdAt:new Date(),
        updatedAt:new Date()
      }
      ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Projects', [{
        //name :'Angular 2.x'
      }], {});

  }
};


