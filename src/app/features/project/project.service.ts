import {Output, EventEmitter, Injectable} from "@angular/core";
import {Response, URLSearchParams} from "@angular/http";
import {Http as HttpClient}  from '@angular/http';
import {Observable} from "rxjs/Observable";

import { Project } from "../../shared/models/project";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";


@Injectable()
export class ProjectService {

    lines=["automotive", "horizontal", "vertical","sap"];
    domains=["Transportation", "Health", "Telecom","Automotive"];
    names=["SBB","Sopre AOM","OSM", "T-Vision", "VPS", "Contie UBR","T-Mobile"]


    constructor(private http: HttpClient) {

    }


    public applySearchByParamString(): Observable<Array<Project>> {
        //let params = new URLSearchParams('');

        let projects = this.generateProjects();
        let delayedResponse = Observable.of(projects).delay(1000);

        return Observable.create((observer) => {
            delayedResponse.subscribe(
                response => {
                    observer.next(response);
                },
                error => {
                    observer.error(error);
                })
            }).take(1);
    }

    generateProjects():Array<Project>{
        let projects=new Array<Project>();

        for(let i=0;i<20;i++){
            let project=new Project({
                name:this.names[this.getRandomizer(0,6)],
                line: this.lines[this.getRandomizer(0,3)],
                domain: this.domains[this.getRandomizer(0,3)],
                description: "Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online",
                teamcount:i.toString()
            });
            projects.push(project);   
        }

        return projects;
    }

     getRandomizer(bottom, top) {
        return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
    }
}