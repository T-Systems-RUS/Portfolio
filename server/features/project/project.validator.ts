import {check} from 'express-validator/check';

const projectValidator = {

  createValidators: () =>  [
      check('name', 'Field name is required').exists().isLength({min: 1, max: 100}),
      check('domainId', 'Field domain is required').exists().isLength({min: 1, max: 100}),
      check('typeId', 'Field type is required').exists().isLength({min: 1, max: 100}),
      check('programId', 'Field program is required').exists().isLength({min: 1, max: 100}),
      check('startdate', 'Field startdate is required').exists().isLength({min: 1, max: 100}),
    ],

  archieveValidators: () => [
      check('id', 'Id is required').exists().isLength({min: 1, max: 100000}),
      check('id', 'Id has to be number').isNumeric()
    ],

  deleteValidators: () => [
    check('uniqueId', 'Project uniqueId is required').exists().isLength({min: 1, max: 100000})
  ]
};

export default projectValidator;
