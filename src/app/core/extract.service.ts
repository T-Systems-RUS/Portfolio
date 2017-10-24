import {Output, EventEmitter, Injectable} from "@angular/core";
import {Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";


@Injectable()
export class ExtractService {

  @Output() errorMessage = new EventEmitter();


  constructor() {
  }

  public extractData(res: Response) {
    let body;
    if (res.text()) {
      body = res.json();
    }
    return body || {};
  }

  public handleError(error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      // const body = error.json() || '';
      // const err = body.error || JSON.stringify(body);
      errMsg = error.toString();//`${error.status} - ${error.statusText || ''}`; //${err};
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Promise.reject(errMsg);
  }
}