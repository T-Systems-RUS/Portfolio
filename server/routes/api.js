const express = require('express');
const router = express.Router();

var models = require('../models');
var projectService=require('../data/services/project.service');

/* GET api listing. */
router.get('/', (req, res) => {

  projectService.getProjects().then(data=>{
    res.send(data);
  }).catch(function(){
    console.log('hello')
  })
  
  
});

module.exports = router;