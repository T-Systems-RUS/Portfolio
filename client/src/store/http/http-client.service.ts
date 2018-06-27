import axios from 'axios';
import {IModel} from '../../shared/interfaces/IModel';


export class HttpClientService {

  catcher = (error: Error) => Promise.reject(error);

  get(url: string) {
    return axios.get(url)
      .catch(this.catcher);
  }

  post(url: string, data:IModel) {
    return axios.post(url, data);
  }

  put<T>(url: string, data:T) {
    return axios.put(url, data);
  }

  delete(url: string) {
    return axios.delete(url)
      .catch(this.catcher);
  }
}
