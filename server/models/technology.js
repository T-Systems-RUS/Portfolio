'use strict';
module.exports = (sequelize, DataTypes) => {
  var Technology = sequelize.define('Technology', {
    name: DataTypes.STRING,
    domain: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    version: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        
      }
    }
  });

  Technology.associate=function(models){
      Technology.belongsToMany(models.Employee,{through: 'employee_technology',as: 'employees'});
      Technology.belongsToMany(models.Project,{through: 'project_technology', as:'projects'});
  }

  return Technology;
};