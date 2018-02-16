import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExtractService} from './extract.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class HttpClientService {

  constructor(private http: HttpClient, private extract: ExtractService) {
  }

  catcher = error => Observable.throw(this.extract.handleError(error));

  get<T>(url: string): Observable<T> {
    return this.http.get(url)
      .catch(this.catcher);
  }

  post<T>(url: string, payload): Observable<T> {
    return this.http.post(url, payload)
      .catch(this.catcher);
  }

  put<T>(url: string, payload): Observable<T> {
    return this.http.put(url, payload)
      .catch(this.catcher);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete(url)
      .catch(this.catcher);
  }
}
