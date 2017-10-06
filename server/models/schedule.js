'use strict';
module.exports = (sequelize, DataTypes) => {
  var Schedule = sequelize.define('Schedule', {
    participation: DataTypes.DECIMAL,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
       
      }
    }
  });

  Schedule.associate=function(models){
      Schedule.belongsTo(models.Project, { as: 'project'});
      Schedule.belongsTo(models.Employee, { as: 'employee'});
      Schedule.belongsTo(models.Role, { as: 'role'});
  }

  return Schedule;
};