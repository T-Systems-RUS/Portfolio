import {Injectable} from '@angular/core';
import {ExtractService} from '../../core/extract.service';
import {Observable} from 'rxjs/Observable';

import {Technology} from '../../shared/models/technology';
import {Routes} from '../../shared/helpers/routes';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TechnologyService {

  routes: Routes;

  constructor(private http: HttpClient, private extract: ExtractService) {
    this.routes = new Routes();
  }

  // GET requests
  getTechnologies(): Observable<Technology[]> {
    // ...using get request
    return this.http.get(this.routes.getTechnologies)
      // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }
}
