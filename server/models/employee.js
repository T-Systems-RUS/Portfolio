'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        Employee.belongsToMany(models.Technology,{through: 'employee_technology'});
        //Employee.hasMany(models.Schedule);
      }
    }
  });
  return Employee;
};