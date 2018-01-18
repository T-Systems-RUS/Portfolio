'use strict';

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


var  technologyValidator={};

technologyValidator.createValidators=function(){
    return [
        check('name','Field name is required').exists().isLength({ min: 1,max:100 }),
        //check('version','Field line is required').exists().isLength({ min: 1,max:100 }),
        check('domain','Field domain is required').exists().isLength({ min: 1,max:100 })
    ]
}

technologyValidator.deleteValidators=function(){
    return [
        check('id','Technology id is required').exists().isLength({ min: 1,max:100000 })
    ]
}





module.exports = technologyValidator;