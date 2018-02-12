import {check} from 'express-validator/check';

const projectValidator = {

  createValidators: () =>  [
      check('name', 'Field name is required').exists().isLength({min: 1, max: 100}),
      check('line', 'Field line is required').exists().isLength({min: 1, max: 100}),
      check('domain', 'Field domain is required').exists().isLength({min: 1, max: 100}),
      check('type', 'Field type is required').exists().isLength({min: 1, max: 100}),
      check('program', 'Field program is required').exists().isLength({min: 1, max: 100}),
      check('startdate', 'Field startdate is required').exists().isLength({min: 1, max: 100}),
    ],

  archieveValidators: () => [
      check('id', 'Id is required').exists().isLength({min: 1, max: 100000}),
      check('id', 'Id has to be number').isNumeric()
    ],

  deleteValidators: () => [
    check('name', 'Project name is required').exists().isLength({min: 1, max: 100000})
  ]
};

export default projectValidator;
