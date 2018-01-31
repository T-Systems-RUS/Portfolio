'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
      return queryInterface.bulkInsert('Roles', [
      //{
      //   name: 'Tester',
      //   domain: 'Testing',
      //   leadrole:false,
      //   active:false,
      //   seniority:'Junior',
      //   createdAt:new Date(),
      //   updatedAt:new Date()
      // },
      // {
      //   name: 'Developer',
      //   domain: 'Development',
      //   leadrole:false,
      //   active:false,
      //   seniority:'Middle',
      //   createdAt:new Date(),
      //   updatedAt:new Date()
      // },
      // {
      //   name: 'Project Manager',
      //   domain: 'Management',
      //   leadrole:false,
      //   active:false,
      //   seniority:'PM',
      //   createdAt:new Date(),
      //   updatedAt:new Date()
      // },
      // {
      //   name: 'Configuration Manager',
      //   domain: 'Development',
      //   leadrole:false,
      //   active:false,
      //   seniority:'senior',
      //   createdAt:new Date(),
      //   updatedAt:new Date()
      // },
      {
        name: 'Head of Sales and Aftersales Solutions',
        domain: 'Management',
        leadrole:true,
        active:false,
        seniority:'PM',
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Roles', [{
        //name :'Angular 2.x'
      }], {});
    
  }
};
