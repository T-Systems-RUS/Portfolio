import {Output, EventEmitter, Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
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

    return Observable.throw(errMsg);
  }

  public handlePostError(error: Response | any) {
    
        let errors:Array<string>=new Array<string>();

        if (error instanceof Response) {
          let resp=error.json()["errors"];
          for(let key of Object.keys(resp)){
              errors.push(resp[key].msg);
          }
        } else {
          errors.toString();
        }
    
        return errors;
    }
}