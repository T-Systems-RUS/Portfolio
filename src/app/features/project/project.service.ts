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
import "rxjs/add/operator/toPromise";


@Injectable()
export class ProjectService {
    routes:Routes;
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
        new Technology({id:"11",name:"gulp",domain:"frontend"}),
        new Technology({id:"12",name:"Java 1.6",domain:"backend"}),
        new Technology({id:"13",name:"Entity Framework",domain:"backend"}),
        new Technology({id:"14",name:"ASP Net Core",domain:"backend"}),
        new Technology({id:"15",name:"CQRS",domain:"backend"}),
        new Technology({id:"16",name:"JSF",domain:"backend"}),
        new Technology({id:"17",name:"JEE",domain:"backend"}),
        new Technology({id:"18",name:"Silenium",domain:"frontend"}),
        new Technology({id:"19",name:"grunt",domain:"frontend"}),
        new Technology({id:"20",name:"Angular 4",domain:"frontend"}),
        new Technology({id:"21",name:"React",domain:"frontend"}),
        new Technology({id:"22",name:"vue",domain:"frontend"})
    ];


    constructor(private http: HttpService, private extract:ExtractService) {
        this.routes=new Routes();
    }


    // public getProjects(): Observable<Array<Project>> {
    //     //let params = new URLSearchParams('');

    //     let projects = this.generateProjects();
    //     let delayedResponse = Observable.of(projects).delay(1000);

    //     return Observable.create((observer) => {
    //         delayedResponse.subscribe(
    //             response => {
    //                 observer.next(response);
    //             },
    //             error => {
    //                 observer.error(error);
    //             })
    //         }).take(1);
    // }

    //GET requests
    getProjects() : Observable<Project[]> {
        
                 // ...using get request
                 return this.http.get(this.routes.getProjects)
                                // ...and calling .json() on the response to return data
                                 .map(this.extract.extractData)
                                 //...errors if any
                                 .catch(this.extract.handleError);
        
    }

    getProject(id) : Observable<Project> {
        
                 // ...using get request
                 return this.http.get(this.routes.getProjects + id)
                                // ...and calling .json() on the response to return data
                                 .map(this.extract.extractData)
                                 //...errors if any
                                 .catch((error:any) => Observable.throw(error.toString() || 'Server error'));
        
    }

    //POST requests
    createProject(project:Project) {

        let data = this.http.createParams(project);

        return this.http.post(this.routes.createProject,data);

    }


    getConstants() : Observable<any> {
        return this.http.getConstants()
                        .map(this.extract.extractData)
                        .catch(this.extract.handleError);
    }

    // generateProjects():Array<Project>{
    //     let projects=new Array<Project>();

    //     for(let i=0;i<20;i++){
    //         let project=new Project({
    //             id:(i+1).toString(),
    //             name:this.names[this.getRandomizer(0,6)],
    //             line: this.lines[this.getRandomizer(0,3)],
    //             domain: this.domains[this.getRandomizer(0,3)],
    //             description: "Online Sales Management system for dealers and  customers. Used for selling vehicles of BMW AG online",
    //             teamcount:i.toString(),
    //             technologies:this.technologies
    //         });
    //         projects.push(project);   
    //     }

    //     return projects;
    // }

    // generateProject():Project{
    //     let project=new Project({
    //         id:"1",
    //         name:this.names[this.getRandomizer(0,6)],
    //         line: this.lines[this.getRandomizer(0,3)],
    //         domain: this.domains[this.getRandomizer(0,3)],
    //         description: "Online Sales Management system for dealers and  customers."+ 
    //                      "Used for selling vehicles of BMW AG online"+
    //                      "Used for selling vehicles of BMW AG online"+
    //                      "Used for selling vehicles of BMW AG online"+
    //                      "Used for selling vehicles of BMW AG online"+
    //                      "Used for selling vehicles of BMW AG online"+
    //                      "Used for selling vehicles of BMW AG online"+
    //                      "Used for selling vehicles of BMW AG online"+
    //                      "Used for selling vehicles of BMW AG online"+
    //                      "Used for selling vehicles of BMW AG online",
    //         teamcount: "10",
    //         customer:"BMW AG"
    //     });
        


    //     for(let i=0;i<10;i++){
    //         project.technologies.push(this.technologies[this.getRandomizer(0,9)]);
    //         project.employees.push(
    //             new Employee({
    //                 firstname:'Ivan' + i,
    //                 lastname:"Ivanov"+i,
    //                 technologies:this.technologies,
    //                 roles:[new Role({
    //                     name:"Lead Architect",
    //                     participation:"100%"
    //                 })]
    //             })
    //         );
    //     }

        

    //     return project;
    // }

    generateEmployees(){
        let employees=new Array<Employee>();
        
        for(let i=0;i<20;i++){
            let employee=new Employee({
                firstname:'Ivan' + i,
                lastname:"Ivanov"+i,
                technologies:this.technologies,
                roles:[new Role({
                    name:"Lead Architect",
                    participation:"100%"
                })]
            })
            employees.push(employee);   
        }

        return employees;
    }

     getRandomizer(bottom, top) {
        return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
    }
}