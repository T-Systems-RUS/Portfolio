import axios from 'axios';


export class HttpClientService {

  catcher = (error: Error) => Promise.reject(error);

  get(url: string) {
    return axios.get(url)
      .catch(this.catcher);
  }
}
