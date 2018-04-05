'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const employees = await queryInterface.sequelize.query(
      'Select id from "Employees"'
    );

    const technologies = await queryInterface.sequelize.query(
      'Select id from "Technologies"'
    );

    const employeeRows = employees[0];
    const technologyRows = technologies[0];

    return await queryInterface.bulkInsert('employee_technology', [
      {
        employeeId: employeeRows[0].id,
        technologyId: technologyRows[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('employee_technology', null, {});
  }
};
