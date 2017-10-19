const express = require('express');
const router = express.Router();

var projectService=require('../data/services/project.service');



router.get('/projects', (req, res) => {
    
    projectService.getProjects().then(data=>{
    res.send(data);
    }).catch(function(){
    console.log('hello')
    })
      
      
});


module.exports = router;