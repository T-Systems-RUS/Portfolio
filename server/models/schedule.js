'use strict';
module.exports = (sequelize, DataTypes) => {
  var Schedule = sequelize.define('Schedule', {
    participation: DataTypes.DECIMAL,
    startdate: DataTypes.DATE                        ,
    enddate: DataTypes.DATE                        ,
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
        Schedule.belongsTo(models.Role,{ foreignKey: 'role_id',as: 'schedule'});
        Schedule.belongsTo(models.Employee,{ foreignKey: 'employee_id',as: 'schedule'});
        Schedule.belongsTo(models.Project,{ foreignKey: 'project_id',as: 'schedule'});
      }
    }
  });
  return Schedule;
};