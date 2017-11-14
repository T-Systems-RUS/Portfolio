const express = require('express');
const router = express.Router();

var technologyService=require('./technology.service');


// GET requests
router.get('/technologies', (req, res) => {
    
    technologyService.getTechnologies().then(data=>{
        if(!data) res.status(404).send("No technologies found");
        
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send(err);
    })
      
      
});



module.exports = router;