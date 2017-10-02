'use strict';
module.exports = (sequelize, DataTypes) => {
  var Technology = sequelize.define('Technology', {
    id: DataTypes.NUMBER,
    name: DataTypes.STRING,
    domain: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Technology.hasMany(models.Employee,{through: 'employee_technology'});
      }
    }
  });
  return Technology;
};