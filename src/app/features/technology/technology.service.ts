import {Injectable} from '@angular/core';
import {ExtractService} from '../../core/extract.service';
import {Observable} from 'rxjs/Observable';

import {Technology} from '../../shared/models/technology';
import {HttpClient} from '@angular/common/http';
import routes from '../../shared/constants/routes';

@Injectable()
export class TechnologyService {

  constructor(private http: HttpClient, private extract: ExtractService) {
  }

  // GET requests
  getTechnologies(): Observable<Technology[]> {
    // ...using get request
    return this.http.get(routes.getTechnologies)
    // ...errors if any
      .catch(error => Observable.throw(this.extract.handleError(error)));
  }
}
