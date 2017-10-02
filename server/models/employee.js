'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    id: DataTypes.NUMBER,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Employee.hasMany(models.Technology,{through: 'employee_technology'});
      }
    }
  });
  return Employee;
};