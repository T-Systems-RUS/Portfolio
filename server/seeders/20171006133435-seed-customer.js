'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const rows = await queryInterface.sequelize.query(
      'Select id from "Domains"'
    );

    const domains = rows[0];

    return await queryInterface.bulkInsert('Customers', [
      {
        name: 'Daimler AG',
        active:false,
        image: 'bmw.png',
        domainId: domains[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'BMW AG',
        active:false,
        image: 'bmw.png',
        domainId: domains[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'MAN AG',
        active:false,
        image: 'bmw.png',
        domainId: domains[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Continental AG',
        active:false,
        image: 'bmw.png',
        domainId: domains[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'SBB',
        active:false,
        image: 'sbb.png',
        domainId: domains[3].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Slovak Telekom',
        active:false,
        image: 'dd.png',
        domainId: domains[4].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Digital Division',
        active:false,
        image: 'dd.png',
        domainId: domains[4].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'AXA Deutschland',
        active:false,
        image: 'sbb.png',
        domainId: domains[1].id,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', [{
      //name :'Angular 2.x'
    }], {});

  }
};
