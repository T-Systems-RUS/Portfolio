'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    domain: DataTypes.STRING,
    leadrole:DataTypes.BOOLEAN,
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
        Role.hasMany(models.Schedule,{
            foreignKey: 'role_id',
            constraints: false,
            scope: {
                commentable: 'schedule'
            }});
      }
    }
  });
  return Role;
};