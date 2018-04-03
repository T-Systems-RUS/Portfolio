'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Programs', [
      {
        name: 'Sales and Aftersales',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Product Lifecycle Management',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Supply Chain Management',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Airport Management',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Big Data Solutions',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Innovation & Product Enabling',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Telekom Solutions',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'HealthCare Solutions',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Cloud Consulting & Transformation Services',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'ECM Solutions',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Rail & Transport Management',
        active:false,
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
