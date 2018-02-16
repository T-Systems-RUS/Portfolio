import * as express from 'express';
import employeeService from './employee.service';
import {Util} from '../../shared/Util';

const router = express.Router();

// GET requests
router.get('/employees', (req, res) =>
  employeeService.getEmployees()
    .then(Util.handleData(res)));

router.get('/roles', (req, res) =>
  employeeService.getRoles()
    .then(Util.handleData(res)));

module.exports = router;
