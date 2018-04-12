import {HttpClientService} from '../../http/http-client.service';
import {routes} from '../../http/routes';

export class TechnologyService extends HttpClientService{

  getTechnologies() {
    return this.get(routes.GET_TECHNOLOGIES);
  };
}
