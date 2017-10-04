'use strict';
module.exports = (sequelize, DataTypes) => {
  var Schedule = sequelize.define('Schedule', {
    participation: DataTypes.DECIMAL,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Schedule.belongsTo(models.Project);
        Schedule.belongsTo(models.Employee)
        Schedule.belongsTo(models.Role)
      }
    }
  });
  return Schedule;
};