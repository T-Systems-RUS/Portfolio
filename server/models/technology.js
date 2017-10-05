'use strict';
module.exports = (sequelize, DataTypes) => {
  var Technology = sequelize.define('Technology', {
    name: DataTypes.STRING,
    domain: DataTypes.STRING,
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
        
      }
    }
  });

  Technology.associate=function(models){
      Technology.belongsToMany(models.Employee,{through: 'employee_technology',as: 'employee'});
      Technology.belongsToMany(models.Project,{through: 'project_technology'});
  }

  return Technology;
};