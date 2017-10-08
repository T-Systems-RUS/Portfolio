const express = require('express');
const router = express.Router();

var models = require('../models');

/* GET api listing. */
router.get('/', (req, res) => {
  // models.sequelize.sync().then(function() {
  //   /**
  //    * Listen on provided port, on all network interfaces.
  //    */

  //   console.log('ok')
    
  // }).catch( error => {
  //   console.log(error)
  // });
  models.Technology.findAll().then(data=>{
    res.send(data[0]);
  })
  
  
});

module.exports = router;