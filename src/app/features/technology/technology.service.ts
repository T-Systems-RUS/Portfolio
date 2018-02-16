import {Injectable} from '@angular/core';
import {Technology} from '../../shared/models/technology';
import routes from '../../shared/constants/routes';
import {HttpClientService} from '../../core/http-client.service';

@Injectable()
export class TechnologyService {

  constructor(private http: HttpClientService) {
  }

  getTechnologies() {
    return this.http.get<Technology[]>(routes.getTechnologies);
  }
}
