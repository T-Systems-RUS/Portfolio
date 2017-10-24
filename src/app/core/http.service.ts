/**
 * Created by apotikho on 29.04.2017.
 */
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptionsArgs, RequestOptions} from "@angular/http";
//import {AuthenticationService} from "../security/auth.service";

@Injectable()
export class HttpService {

  constructor(private http: Http) {
  }

  public  getCommonHeaders(): Headers {
    //let token = this.auth.getLoggedInUser() ? this.auth.getLoggedInUser().token : '';
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
   // headers.append('Authorization', `Bearer ${token}`);

    //Prevent Ajax Request Caching for Internet Explorer
    headers.append("Cache-control", "no-cache");
    headers.append("Cache-control", "no-store");
    headers.append("Pragma", "no-cache");
    headers.append("Expires", "0");

    return headers;
  }

  get(url, options?: RequestOptionsArgs) {
    let opt = options ? options : new RequestOptions();
    opt.headers = this.getCommonHeaders();
    return this.http.get(url, opt);
  }

  post(url, data, options?: RequestOptionsArgs) {
    let opt = options ? options : new RequestOptions();
    opt.headers = this.getCommonHeaders();
    return this.http.post(url, data, opt);
  }

  put(url, data, options?: RequestOptionsArgs) {
    let opt = options ? options : new RequestOptions();
    opt.headers = this.getCommonHeaders();
    return this.http.put(url, data, opt);
  }

  delete(url, options?: RequestOptionsArgs) {
    let opt = options ? options : new RequestOptions();
    opt.headers = this.getCommonHeaders();
    return this.http.delete(url, opt);
  }

  getConstants(){
     return this.http.request('./../assets/constants.json');
  }
}

