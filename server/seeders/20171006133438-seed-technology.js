'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Technologies', [
      {
        name: 'Angular 6',
        domain: 'frontend',
        active:false,
        image: 'angular.png',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Java 1.8',
        domain: 'backend',
        active:false,
        image: 'Java.png',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'JSF',
        domain: 'backend',
        active:false,
        image: 'JSF.png',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Jenkins',
        domain: 'backend',
        active:false,
        image: 'Jenkins.png',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'React',
        domain: 'frontend',
        active:false,
        image: 'react.png',
        createdAt:new Date(),
        updatedAt:new Date()
      },
        {
        name: 'VueJs',
        domain: 'frontend',
        active:false,
          image: 'vue.png',
        createdAt:new Date(),
        updatedAt:new Date()
      },{
        name: '.NET 4.5',
        domain: 'backend',
        active:false,
          image: 'sass.png',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Scrum',
        domain: 'methodology',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Agile',
        domain: 'methodology',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'English',
        domain: 'language',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'German',
        domain: 'language',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'AngularJs',
        domain: 'frontend',
        image: 'angular.png',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Node JS',
        domain: 'backend',
        image: 'node.png',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Entity Framework',
        domain: 'backend',
        image: 'db.png',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'Swagger',
        domain: 'tools',
        image: 'swagger.png',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name: 'JQuery',
        domain: 'frontend',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },{
        name: 'CSS3',
        domain: 'frontend',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      },{
        name: 'JDB',
        domain: 'backend',
        active:false,
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Technologies', [{
        //name :'Angular 2.x'
      }], {});

  }
};
