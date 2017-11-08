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

    let errors: Error=new Error();
    if (error instanceof Response) {
      errors.status=error.status;
      errors.statusText=error.statusText;

      errors.errors.push(error.text());
    } else {
      errors.errors.push(error.message ? error.message : error.toString());
    }

    return errors;
  }

  public handlePostError(error: Response | any) {
    
        let errors:Error=new Error();
        
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