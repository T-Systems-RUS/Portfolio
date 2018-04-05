'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = await queryInterface.sequelize.query(
      'Select id from "Roles"'
    );

    const projects = await queryInterface.sequelize.query(
      'Select id from "Projects"'
    );

    const employees = await queryInterface.sequelize.query(
      'Select id from "Employees"'
    );

    const roleRows = roles[0];
    const projectRows = projects[0];
    const employeeRows = employees[0];

    return await queryInterface.bulkInsert('Schedules', [
      {
        participation: 100.00,
        startdate: new Date(),
        projectId: projectRows[0].id,
        employeeId: employeeRows[0].id,
        roleId:roleRows[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        participation: 100.00,
        startdate: new Date(),
        projectId: projectRows[0].id,
        employeeId: employeeRows[1].id,
        roleId:roleRows[1].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        participation: 100.00,
        startdate: new Date(),
        projectId: projectRows[0].id,
        employeeId: employeeRows[2].id,
        roleId:roleRows[2].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        participation: 100.00,
        startdate: new Date(),
        projectId: projectRows[0].id,
        employeeId: employeeRows[3].id,
        roleId:roleRows[3].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        participation: 100.00,
        startdate: new Date(),
        projectId: projectRows[1].id,
        employeeId: employeeRows[0].id,
        roleId:roleRows[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        participation: 100.00,
        startdate: new Date(),
        projectId: projectRows[1].id,
        employeeId: employeeRows[1].id,
        roleId:roleRows[1].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        participation: 100.00,
        startdate: new Date(),
        projectId: projectRows[1].id,
        employeeId: employeeRows[2].id,
        roleId:roleRows[2].id,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        participation: 80.00,
        startdate: new Date(),
        projectId: projectRows[1].id,
        employeeId: employeeRows[3].id,
        roleId:roleRows[3].id,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Schedules', null, {});
  }
};
