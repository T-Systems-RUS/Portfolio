import * as express from 'express';
import {ServerConstants} from './server.constants';

import * as projectController from './../features/project/project.controller';
import * as technologyController from './../features/technology/technology.controller';
import * as employeeController from './../features/employee/employee.controller';
import * as fileController from './../shared/file.controller';

/**
 * Used to set up extra routes
 * and controllers
 * @export
 * @const
 */

const ServerRoutes = {
    configureRoutes: app => {
        app.use(ServerConstants.IMAGES_ROUTE, express.static(ServerConstants.IMAGES_PATH));

        // Set our api routes
        app.use(ServerConstants.API_PREFIX, projectController);
        app.use(ServerConstants.API_PREFIX, technologyController);
        app.use(ServerConstants.API_PREFIX, employeeController);
        app.use(ServerConstants.API_PREFIX, fileController);
    }
};

export default ServerRoutes;
