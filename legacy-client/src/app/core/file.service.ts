import {Injectable} from '@angular/core';
import {Project} from '../shared/models/project';
import routes from '../shared/constants/routes';
import {HttpClientService} from './http-client.service';

@Injectable()
export class FileService {

  constructor(private http: HttpClientService) {
  }

  removeImage(project: Project) {
    return this.http.put<Project>(routes.removeImage, project);
  }
}
