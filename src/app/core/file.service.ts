import {Output, EventEmitter, Injectable} from "@angular/core";
import {Response, URLSearchParams} from "@angular/http";
import { HttpService }  from "./http.service";
import { ExtractService }  from "./extract.service";
import {Observable} from "rxjs/Observable";


import { Project } from "../shared/models/project";

import { PortfolioQueryEncoder } from "../shared//helpers/queryEncoder";
import { Routes } from '../shared/helpers/routes';

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";
import * as pptx from "pptxgenjs";


@Injectable()
export class FileService {

    routes:Routes;

    constructor(private http: HttpService, private extract:ExtractService) {
        this.routes=new Routes();
    }




    //GET requests
    removeImage(project:Project):Observable<Project> {
        let data = this.http.createParams(project);
        return this.http.put(this.routes.removeImage,data)
                        .map(this.extract.extractData)
                        .catch((error:any) => Observable.throw(this.extract.handlePostError(error)));        
    }


    createPresentation(project:Project) /*:Observable<Project>*/{
       // var pptx = new pptx();
       pptx.setBrowser(true);
        var slide = pptx.addNewSlide();
        slide.addText(
          project.name,
          { x:0.0, y:0.25, w:'100%', h:1.5, align:'c', font_size:24, color:'0088CC', fill:'F1F1F1' }
        );

        pptx.save('Demo');  
    }
}