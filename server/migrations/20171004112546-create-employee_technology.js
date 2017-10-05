module.exports = {
    up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('employee_technology',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          employeeId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Employees',
              key: 'id'
            },
            allowNull: false
          },
          technologyId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Technologies',
              key: 'id'
            },
            allowNull: false
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
        }
    )},
  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('employee_technology')
    }
  };