'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    domain: DataTypes.STRING,
    leadrole: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN,

  }, {
    classMethods: {
      associate: function(models) {
        Role.hasMany(models.Schedule);
      }
    }
  });
  return Role;
};