import {Injectable} from '@angular/core';
import {ExtractService} from './extract.service';
import {Observable} from 'rxjs/Observable';

import {Project} from '../shared/models/project';
import {Routes} from '../shared/helpers/routes';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FileService {

  routes: Routes;

  constructor(private http: HttpClient, private extract: ExtractService) {
    this.routes = new Routes();
  }

  // GET requests
  removeImage(project: Project): Observable<Project> {
    return this.http.put(this.routes.removeImage, project)
      .catch((error: {}) => Observable.throw(this.extract.handlePostError(error)));
  }

}
