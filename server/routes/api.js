const express = require('express');
const router = express.Router();

var models = require('../models');

/* GET api listing. */
router.get('/', (req, res) => {

  models.Schedule.findAll(
    {
      
        include: [{
            as: 'project',
            model:models.Project
          }
        
    ]
  }
).then(data=>{
    res.send(data[0].project);
  })
  
  
});

module.exports = router;