import * as express from 'express';
import projectService from './project.service';
import projectValidator from './project.validator';
import {Util} from '../../shared/Util';

const router = express.Router();

// GET requests
router.get('/projects', (req, res) =>
  projectService.getProjects()
    .then(Util.handleData(res)));

router.get('/projects/:id', (req, res) =>
  projectService.getProject(req.params.id)
    .then(Util.handleData(res)));

router.get('/projects/history/:name', (req, res) =>
  projectService.getProjectsByName(req.params.name)
    .then(Util.handleData(res)));

// POST Requests
router.post('/projects/create', projectValidator.createValidators(), (req, res) => {
  Util.validateRequest(req, res);

  return projectService.doesProjectExist(req.body.name).then(doesExist => {
    if (doesExist) {
      res.status(409).json({errors: {latest: {msg: 'Project already exists or was archieved'}}});
    } else {
      projectService.createProject(req.body).then(Util.handleData(res));
    }
  });
});

router.post('/projects/update', projectValidator.createValidators(), (req, res) => {
  Util.validateRequest(req, res);

  return projectService.isProjectLatest(req.body.id).then(isLatest => {
    if (isLatest) {
      projectService.updateProject(req.body).then(Util.handleData(res));
    } else {
      res.status(409).json({errors: {latest: {msg: 'Somebody has already updated the project in background'}}});
    }
  });
});

// Put Requests
router.put('/projects/archieve', projectValidator.archieveValidators(), (req, res) => {
  Util.validateRequest(req, res);

  projectService.isProjectLatest(req.body.id).then(isLatest => {
    if (isLatest) {
      projectService.archieveProject(req.body.id).then(Util.handleData(res));
    } else {
      res.status(409).json({errors: {latest: {msg: 'Somebody has already deleted the project in background'}}});
    }
  });
});

router.delete('/projects/delete/:name', projectValidator.deleteValidators(), (req, res) => {
  Util.validateRequest(req, res);

  projectService.deleteProject(req.params.name)
    .then(() => res.status(200).json({message: 'ok'}));
});

module.exports = router;
