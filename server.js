

// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const validator = require('express-validator');


// Get our API routes
const api = require('./server/routes/api');

const projectController = require('./server/features/project/project.controller');
const technologyController = require('./server/features/technology/technology.controller');
const employeeController = require('./server/features/employee/employee.controller');
const fileController=require('./server/shared/file.controller');

const app = express();


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/server/images', express.static('server/images'));


// Set our api routes
app.use('/api', projectController);
app.use('/api', technologyController);
app.use('/api', employeeController);
app.use('/api', fileController);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);





/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));


