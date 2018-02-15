import * as express from 'express';
import employeeService from './employee.service';

const router = express.Router();

// GET requests
router.get('/employees', (req, res) => {

  employeeService.getEmployees().then(data => {
    if (!data) {
      res.status(404).send('No employees found');
    }

    res.status(200).send(data);
  });
});

router.get('/roles', (req, res) => {
  employeeService.getRoles().then(roles => {
    if (!roles) {
      res.status(404).send('No roles found');
    }

    res.status(200).send(roles);
  });
});

module.exports = router;
