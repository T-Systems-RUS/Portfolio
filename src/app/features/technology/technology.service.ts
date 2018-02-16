import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {ExtractService} from '../../core/extract.service';
import {Observable} from 'rxjs/Observable';

import {Technology} from '../../shared/models/technology';
import {Routes} from '../../shared/helpers/routes';

@Injectable()
export class TechnologyService {

  routes: Routes;

  constructor(private http: HttpService, private extract: ExtractService) {
    this.routes = new Routes();
  }

  // GET requests
  getTechnologies(): Observable<Technology[]> {
    // ...using get request
    return this.http.get(this.routes.getTechnologies)
    // ...and calling .json() on the response to return data
      .map(this.extract.extractData)
      // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }
}
