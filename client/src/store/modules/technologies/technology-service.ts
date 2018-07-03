import axios from 'axios';
import {routes} from '../../http/routes';
import {ITechnology} from '../../../shared/interfaces/ITechnology';

export class TechnologyService {

  static getTechnologies() {
    return axios.get<ITechnology[]>(routes.GET_TECHNOLOGIES);
  };
}
