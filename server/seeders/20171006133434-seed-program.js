'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const rows = await queryInterface.sequelize.query(
      'Select id from "Lines"'
    );

    const lines = rows[0];

     return await queryInterface.bulkInsert('Programs', [
      {
        name: 'Sales and Aftersales',
        active:false,
        lineId: lines[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Product Lifecycle Management',
        active:false,
        lineId: lines[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Supply Chain Management',
        active:false,
        lineId: lines[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Airport Management',
        active:false,
        lineId: lines[1].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Big Data Solutions',
        active:false,
        lineId: lines[1].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Innovation & Product Enabling',
        active:false,
        lineId: lines[2].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Telekom Solutions',
        active:false,
        lineId: lines[1].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'HealthCare Solutions',
        active:false,
        lineId: lines[1].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Cloud Consulting & Transformation Services',
        active:false,
        lineId: lines[1].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'ECM Solutions',
        active:false,
        lineId: lines[1].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Rail & Transport Management',
        active:false,
        lineId: lines[1].id,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Programs', [{
      //name :'Angular 2.x'
    }], {});

  }
};
