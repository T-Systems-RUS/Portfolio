import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import projectService from '../features/project/project.service';

import {Util} from './Util';

const DIST = 'images/';
const router = express.Router();

// POST requests
router.post('/images/add', (req, res) => {
  if (req.body.data) {
    const regexp = '^data:image\\/' + req.body.type + ';base64,';

    const base64Data = req.body.data.replace(new RegExp(regexp) , ''),
      binaryData = new Buffer(base64Data, 'base64').toString('binary');

    // Util handleData doesn't work
    fs.writeFile(DIST + req.body.name, binaryData, 'binary', () =>
      res.status(200).send({ 'filename' : req.body.name}));
  }
});

router.put('/images/remove', (req, res) => {
  console.log(DIST + req.body.image);
  const image = DIST + req.body.image;

  const exists = fs.existsSync(image);
  console.log(exists);
  if (exists) {
    fs.unlink(image, () => res.status(200).send('removed'));
  } else {
    res.status(404).send('File not found.');
  }
});

router.get('/presentation/images/:id?', (req, res) => {

  projectService.getProject(req.params.id).then(project => {
    if (!project) {
      res.status(404).send('No projects found');
    }

    const dist = '../images/presentation';

    const header = fs.readFileSync(path.join(__dirname, dist, 'Header.png'));
    const header2 = fs.readFileSync(path.join(__dirname, dist, 'Header2.png'));
    const domain = fs.existsSync(path.join(__dirname, dist, project.domain + '.png')) ?
      fs.readFileSync(path.join(__dirname, dist, project.domain + '.png')) : '';

    const image = fs.existsSync(path.join(__dirname, '../images', project.image || 'image.png')) ?
      fs.readFileSync(path.join(__dirname, '../images', project.image)) : '';

    const technologies = [];
    for (const technology of project.technologies) {
      if (fs.existsSync(path.join(__dirname, dist, technology.image || 'image.png'))) {
        const tech = fs.readFileSync(path.join(__dirname, dist, technology.image));
        technologies.push({
          domain: technology.domain,
          name: technology.name,
          image: new Buffer(tech, 'binary').toString('base64')
        });
      }
    }

    const images = {
      header: new Buffer(header, 'binary').toString('base64'),
      header2: new Buffer(header2, 'binary').toString('base64'),
      domain: new Buffer(domain, 'binary').toString('base64'),
      image: new Buffer(image, 'binary').toString('base64'),
      technologies: technologies
    };

    res.status(200).send(images);
  });
});

module.exports = router;
