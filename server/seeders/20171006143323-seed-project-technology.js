'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const projects = await queryInterface.sequelize.query(
      'Select id from "Projects"'
    );

    const technologies = await queryInterface.sequelize.query(
      'Select id from "Technologies"'
    );

    const projectRows = projects[0];
    const technologieRows = technologies[0];

    return await queryInterface.bulkInsert('project_technology', [
      {
        projectId: projectRows[0].id,
        technologyId: technologieRows[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[0].id,
        technologyId: technologieRows[1].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[0].id,
        technologyId: technologieRows[2].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[0].id,
        technologyId: technologieRows[3].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[0].id,
        technologyId: technologieRows[4].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[0].id,
        technologyId: technologieRows[5].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[0].id,
        technologyId: technologieRows[6].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[0].id,
        technologyId: technologieRows[7].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[1].id,
        technologyId: technologieRows[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[1].id,
        technologyId: technologieRows[1].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[1].id,
        technologyId: technologieRows[2].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[1].id,
        technologyId: technologieRows[3].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[1].id,
        technologyId: technologieRows[4].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[1].id,
        technologyId: technologieRows[5].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[1].id,
        technologyId: technologieRows[6].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        projectId: projectRows[1].id,
        technologyId: technologieRows[7].id,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('project_technology', null, {});
  }
};
