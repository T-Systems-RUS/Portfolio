import {Injectable} from '@angular/core';
import {ExtractService} from './extract.service';
import {Observable} from 'rxjs/Observable';

import {Project} from '../shared/models/project';
import {HttpClient} from '@angular/common/http';
import routes from '../shared/constants/routes';

@Injectable()
export class FileService {

  constructor(private http: HttpClient, private extract: ExtractService) {
  }

  // GET requests
  removeImage(project: Project): Observable<Project> {
    return this.http.put(routes.removeImage, project)
      .catch((error: {}) => Observable.throw(this.extract.handlePostError(error)));
  }

}
