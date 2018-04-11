'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const projects = await queryInterface.sequelize.query(
      'Select id from "Projects"'
    );

    const customers = await queryInterface.sequelize.query(
      'Select id from "Customers"'
    );

    const projectRows = projects[0];
    const customerRows = customers[0];

    return await queryInterface.bulkInsert('project_customer', [
      {
        projectId: projectRows[0].id,
        customerId: customerRows[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[0].id,
        customerId: customerRows[1].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[1].id,
        customerId: customerRows[2].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[2].id,
        customerId: customerRows[3].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[3].id,
        customerId: customerRows[4].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[4].id,
        customerId: customerRows[4].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[5].id,
        customerId: customerRows[5].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[6].id,
        customerId: customerRows[6].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[7].id,
        customerId: customerRows[7].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[8].id,
        customerId: customerRows[5].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[8].id,
        customerId: customerRows[4].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[9].id,
        customerId: customerRows[1].id,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('project_customer', null, {});
  }
};
