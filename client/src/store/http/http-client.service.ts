import axios from 'axios';
import {IProject} from '../../shared/interfaces/IProject';


export class HttpClientService {

  catcher = (error: Error) => Promise.reject(error);

  get(url: string) {
    return axios.get(url)
      .catch(this.catcher);
  }

  post(url: string, data:IProject) {
    return axios.post(url, data);
  }

  delete(url: string) {
    return axios.delete(url)
      .catch(this.catcher);
  }
}
