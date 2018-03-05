import * as http from 'http';
import {app} from './server-addons/server.config';
import {ServerRoutes} from './server-addons/server.routes';
import {ServerDefaults} from './server-addons/server.defaults';

ServerRoutes.configureRoutes(app);
ServerDefaults.setGlobalErrorHandling(app);
ServerDefaults.setGlobalRouteHandler(app);
ServerDefaults.setPort(app);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(ServerDefaults.port, () => console.log(`API running on localhost:${ServerDefaults.port}`));
