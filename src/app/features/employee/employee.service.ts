import {Output, EventEmitter, Injectable} from "@angular/core";
import {Response, URLSearchParams} from "@angular/http";
import { HttpService }  from "../../core/http.service";
import { ExtractService }  from "../../core/extract.service";
import {Observable} from "rxjs/Observable";


import { Employee } from "../../shared/models/employee";


import { PortfolioQueryEncoder } from "../../shared//helpers/queryEncoder";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";


@Injectable()
export class EmployeeService {



    constructor(private http: HttpService, private extract:ExtractService) {

    }




    //GET requests
    getEmployees() : Observable<Employee[]> {
        
                 // ...using get request
                 return this.http.get('/api/employees')
                                // ...and calling .json() on the response to return data
                                 .map(this.extract.extractData)
                                 //...errors if any
                                 .catch(this.extract.handleError);
        
    }
 
}