'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    line: DataTypes.STRING,
    domain: DataTypes.STRING,
    description: DataTypes.STRING,
    customer:DataTypes.STRING,
    teamcount: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    ishistory:DataTypes.BOOLEAN,
    version:DataTypes.INTEGER,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        
      }
    }
  });

  Project.associate=function(models){
    Project.hasMany(models.Schedule, { as: 'schedules'});
    Project.belongsToMany(models.Technology,{through: 'project_technology', as: 'technologies'});
  }

  return Project;
};