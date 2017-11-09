import {Output, EventEmitter, Injectable} from "@angular/core";
import {Response, URLSearchParams} from "@angular/http";
import { HttpService }  from "../../core/http.service";
import { ExtractService }  from "../../core/extract.service";
import {Observable} from "rxjs/Observable";


import { Employee } from "../../shared/models/employee";
import { Role } from "../../shared/models/role";

import { PortfolioQueryEncoder } from "../../shared//helpers/queryEncoder";
import { Routes } from './../../shared/helpers/routes';

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";


@Injectable()
export class EmployeeService {

    routes:Routes;

    constructor(private http: HttpService, private extract:ExtractService) {
        this.routes=new Routes();
    }




    //GET requests
    getEmployees() : Observable<Employee[]> {
        
                 // ...using get request
                 return this.http.get(this.routes.getEmployees)
                                // ...and calling .json() on the response to return data
                                 .map(this.extract.extractData)
                                 //...errors if any
                                 .catch((error:any) => Observable.throw(this.extract.handleError(error)));
        
    }

    getRoles() : Observable<Role[]> {
        
                 // ...using get request
                 return this.http.get(this.routes.getRoles)
                                // ...and calling .json() on the response to return data
                                 .map(this.extract.extractData)
                                 //...errors if any
                                 .catch((error:any) => Observable.throw(this.extract.handleError(error)));
        
    }

}