'use strict';

const express = require('express');
const router = express.Router();




// GET requests
router.post('/images/add', (req, res) => {
    console.log(req.body);
    res.send(req.body);

      
      
});





module.exports = router;