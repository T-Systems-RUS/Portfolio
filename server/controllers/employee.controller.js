const express = require('express');
const router = express.Router();

var employeeService=require('../data/services/employee.service');


// GET requests
router.get('/employees', (req, res) => {
    
    employeeService.getEmployees().then(data=>{
        if(!data) res.status(404).send("No technologies found");
        
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send(err);
    })
      
      
});



module.exports = router;