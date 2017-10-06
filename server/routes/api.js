const express = require('express');
const router = express.Router();

var models = require('../models');

/* GET api listing. */
router.get('/', (req, res) => {
  models.sequelize.sync().then(function() {
    /**
     * Listen on provided port, on all network interfaces.
     */

    console.log('ok')
    res.send(Object.keys(models.sequelize));
  }).catch( error => {
    console.log(eror)
  });
  
});

module.exports = router;