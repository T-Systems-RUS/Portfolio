import {Output, EventEmitter, Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Error} from '../shared/models/error';

class MessageResponse extends Error {
  message: string;
}

@Injectable()
export class ExtractService {

  @Output() errorMessage = new EventEmitter();

  // for get requests
  public handleError(error: MessageResponse) {

    const errors: Error = new Error();
    if (error instanceof Response) {
      errors.status = error.status;
      errors.statusText = error.statusText;

      errors.errors.push(error.text());
    } else {
      errors.errors.push(error.message ? error.message : error.toString());
    }

    return errors;
  }

  // for post requests
  public handlePostError(error: Response | {}) {

    const errors: Error = new Error();

    if (error instanceof Response) {
      errors.status = error.status;
      errors.statusText = error.statusText;

      const resp = error.json()['errors'];
      for (const key of Object.keys(resp)) {
        errors.errors.push(resp[key].msg);
      }
    } else {
      errors.errors.push(error.toString());
    }

    return errors;
  }

}
