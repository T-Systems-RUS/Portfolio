import {Output, EventEmitter, Injectable} from "@angular/core";
import {Response, URLSearchParams} from "@angular/http";
import { HttpService }  from "../../core/http.service";
import { ExtractService }  from "../../core/extract.service";
import {Observable} from "rxjs/Observable";

import { Project } from "../../shared/models/project";
import { Technology } from "../../shared/models/technology";
import { Employee } from "../../shared/models/employee";
import { Role } from "../../shared/models/role";

import { Routes } from './../../shared/helpers/routes';

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";



@Injectable()
export class ProjectService {
    routes:Routes;



    constructor(private http: HttpService, private extract:ExtractService) {
        this.routes=new Routes();
    }


    //GET requests
    getProjects() : Observable<Project[]> {
        
                 // ...using get request
                 return this.http.get(this.routes.getProjects)
                                // ...and calling .json() on the response to return data
                                 .map(this.extract.extractData)
                                 //...errors if any
                                 .catch((error:any) => Observable.throw(this.extract.handleError(error)));
        
    }

    getProjectsByName(name) : Observable<Project[]> {
        
                 // ...using get request
                 return this.http.get(this.routes.history + name)
                                // ...and calling .json() on the response to return data
                                 .map(this.extract.extractData)
                                 //...errors if any
                                 .catch((error:any) => Observable.throw(this.extract.handleError(error)));
        
    }

    getProject(id) : Observable<Project> {
        
                 // ...using get request
                 return this.http.get(this.routes.getProjects + id)
                                // ...and calling .json() on the response to return data
                                 .map(this.extract.extractData)
                                 //...errors if any
                                 .catch((error:any) => Observable.throw(this.extract.handleError(error)));
        
    }

    //POST requests
    createProject(project:Project) {
        let data = this.http.createParams(project);
        return this.http.post(this.routes.createProject,data)
                        .map(this.extract.extractData)
                        .catch((error:any) => Observable.throw(this.extract.handlePostError(error)));
    }

    updateProject(project:Project) {
        
        let data = this.http.createParams(project);
        return this.http.post(this.routes.updateProject,data)
                        .map(this.extract.extractData)
                        .catch((error:any) => Observable.throw(this.extract.handlePostError(error)));

    }

    archieveProject(project:Project) {
        
        let data = this.http.createParams(project);
        return this.http.put(this.routes.archieve,data)
                        .map(this.extract.extractData)
                        .catch((error:any) => Observable.throw(this.extract.handlePostError(error)));

    }

    deleteProject(project:Project) {       
        return this.http.delete(this.routes.deleteProject + project.name)
                        .map(this.extract.extractData)
                        .catch((error:any) => Observable.throw(this.extract.handlePostError(error)));

    }


    getConstants() : Observable<any> {
        return this.http.getConstants()
                        .map(this.extract.extractData)
                        .catch((error:any) => Observable.throw(this.extract.handleError(error)));
    }


     getRandomizer(bottom, top) {
        return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
    }
}