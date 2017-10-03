'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    line: DataTypes.STRING,
    domain: DataTypes.STRING,
    description: DataTypes.STRING,
    teamcount:{
        type: Sequelize.STRING,
        defaultValue:"0",
        get() {
            return "0";
        }
    },
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
        Project.hasMany(models.Schedule,{
            foreignKey: 'project_id',
            constraints: false,
            scope: {
                commentable: 'schedule'
            }});
      }
    }
  });
  return Project;
};





