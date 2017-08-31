import {Output, EventEmitter, Injectable} from "@angular/core";
import {Response, URLSearchParams} from "@angular/http";
import {Http as HttpClient}  from '@angular/http';
import {Observable} from "rxjs/Observable";

import { Project } from "../../shared/models/project";
import { Technology } from "../../shared/models/technology";
import { Employee } from "../../shared/models/employee";
import { Role } from "../../shared/models/role";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";


@Injectable()
export class ProjectService {

    lines=["automotive", "horizontal", "vertical","sap"];
    domains=["Transportation", "Health", "Telecom","Automotive"];
    names=["SBB","Sopre AOM","OSM", "T-Vision", "VPS", "Contie UBR","T-Mobile"];
    technologies=[
        new Technology({id:"1",name:"Java 1.8",domain:"backend"}),
        new Technology({id:"2",name:"Maven",domain:"backend"}),
        new Technology({id:"3",name:"Spring",domain:"backend"}),
        new Technology({id:"4",name:"Hibernate",domain:"backend"}),
        new Technology({id:"5",name:"Jenkins",domain:"backend"}),
        new Technology({id:"6",name:"DB2",domain:"backend"}),
        new Technology({id:"7",name:"HTML5",domain:"frontend"}),
        new Technology({id:"8",name:"Typescript",domain:"frontend"}),
        new Technology({id:"9",name:"Angular 2",domain:"frontend"}),
        new Technology({id:"10",name:"webpack",domain:"frontend"}),
        new Technology({id:"11",name:"gulp",domain:"frontend"})
    ];


    constructor(private http: HttpClient) {

    }


    public getProjects(): Observable<Array<Project>> {
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
                id:(i+1).toString(),
                name:this.names[this.getRandomizer(0,6)],
                line: this.lines[this.getRandomizer(0,3)],
                domain: this.domains[this.getRandomizer(0,3)],
                description: "Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online",
                teamcount:i.toString(),
                technologies:this.technologies
            });
            projects.push(project);   
        }

        return projects;
    }

    generateProject():Project{
        let project=new Project({
            id:"1",
            name:this.names[this.getRandomizer(0,6)],
            line: this.lines[this.getRandomizer(0,3)],
            domain: this.domains[this.getRandomizer(0,3)],
            description: "Online Sales Management system for dealers and  customers."+ 
                         "Used for selling vehicles of BMW AG online"+
                         "Used for selling vehicles of BMW AG online"+
                         "Used for selling vehicles of BMW AG online"+
                         "Used for selling vehicles of BMW AG online"+
                         "Used for selling vehicles of BMW AG online"+
                         "Used for selling vehicles of BMW AG online"+
                         "Used for selling vehicles of BMW AG online"+
                         "Used for selling vehicles of BMW AG online"+
                         "Used for selling vehicles of BMW AG online",
            teamcount: "10",
            customer:"BMW AG"
        });


        for(let i=0;i<10;i++){
            project.technologies.push(this.technologies[this.getRandomizer(0,9)]);
            project.employees.push(
                new Employee({
                    firstname:'Ivan' + i,
                    lastname:"Ivanov"+i,
                    technologies:this.technologies,
                    roles:[new Role({
                        name:"Lead Architect",
                        participation:"100%"
                    })]
                })
            );
        }

        

        return project;
    }

     getRandomizer(bottom, top) {
        return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
    }
}