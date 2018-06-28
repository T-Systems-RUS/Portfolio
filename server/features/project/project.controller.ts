import * as express from 'express';
import projectService from './project.service';
import projectValidator from './project.validator';
import {Util} from '../../shared/Util';
import projectAddonsService from './shared/project-addons.service';
import technologyService from '../technology/technology.service';

const router = express.Router();

// GET requests
router.get('/projects', (req, res) =>
  projectService.getProjects()
    .then(Util.handleData(res)));

router.get('/projects/addons', (req, res) =>
  projectAddonsService.getProjectFilterModel()
    .then(Util.handleData(res)));

router.get('/projects/:id', (req, res) =>
  projectService.getProject(req.params.id)
    .then(Util.handleData(res)));

router.get('/projects/history/:uniqueId', (req, res) =>
  projectService.getProjectsByUniqueId(req.params.uniqueId)
    .then(Util.handleData(res)));

router.get('/projects/exists/:name', (req, res) =>
  projectService.doesProjectWithNameExist(req.params.name)
    .then(doesExist => res.status(200).send(doesExist)));

router.get('/projects/update/exists/:name/:id', (req, res) =>
  projectService.doesProjectWithNameAndIdExist(req.params.name, req.params.id)
    .then(doesExist => res.status(200).send(doesExist)));

// POST Requests
router.post('/projects/create', projectValidator.createValidators(), (req, res) =>
  Util.handleValidation(req, res, () =>
    projectService.doesProjectWithNameExist(req.body.name).then(doesExist =>
      doesExist ?
        Util.handleConflict(res, 'Project already exists or was archieved') :
        projectService.createProject(req.body)
          .then(Util.handleData(res)))
  ));

router.post('/projects/update', projectValidator.createValidators(), (req, res) =>
  Util.handleValidation(req, res, () =>
    projectService.isProjectLatest(req.body.id).then(isLatest =>
      !isLatest ?
        Util.handleConflict(res, 'Somebody has already updated the project in background') :
        projectService.updateProject(req.body)
          .then(Util.handleData(res)))
  ));

// Put Requests
router.put('/projects/archieve', projectValidator.archieveValidators(), (req, res) =>
  Util.handleValidation(req, res, () =>
    projectService.isProjectLatest(req.body.id).then(isLatest =>
      !isLatest ?
        Util.handleConflict(res, 'Somebody has already deleted the project in background') :
        projectService.archieveProject(req.body.id)
          .then(Util.handleData(res)))
  ));

router.put('/projects/update/image', (req, res) =>
  projectService.updateImage(req.body.id, req.body.image)
    .then(Util.handleData(res))
  )


router.delete('/projects/delete/:uniqueId', projectValidator.deleteValidators(), (req, res) =>
  Util.handleValidation(req, res, () =>
    projectService.deleteProject(req.params.uniqueId)
      .then(() => res.status(200).json({message: 'ok'}))
  ));

module.exports = router;
