import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ExtractService} from './extract.service';
import {Observable} from 'rxjs/Observable';

import {Project} from '../shared/models/project';
import {Routes} from '../shared/helpers/routes';

@Injectable()
export class FileService {

  routes: Routes;

  constructor(private http: HttpService, private extract: ExtractService) {
    this.routes = new Routes();
  }

  // GET requests
  removeImage(project: Project): Observable<Project> {
    const data = this.http.createParams(project);
    return this.http.put(this.routes.removeImage, data)
      .map(this.extract.extractData)
      .catch((error: {}) => Observable.throw(this.extract.handlePostError(error)));
  }

}
