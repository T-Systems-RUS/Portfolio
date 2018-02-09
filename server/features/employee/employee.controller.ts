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
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.get('/roles', async (req, res) => {

  try {
    const roles = await employeeService.getRoles();
    if (!roles) {
      res.status(404).send('No roles found');
    }

    return res.status(200).send(roles);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
