import {Output, EventEmitter, Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Error } from '../shared/models/error';



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
    
        let errors:Error=new Error();
        console.log(error)
        if (error instanceof Response) {
          errors.status=error.status;
          errors.statusText=error.statusText;

          let resp=error.json()["errors"];
          for(let key of Object.keys(resp)){
              errors.errors.push(resp[key].msg);
          }
        } else {
            errors.errors.push(error.toString());
        }
    
        return errors;
    }

  }  