import {Output, EventEmitter, Injectable} from "@angular/core";
import {Response, URLSearchParams} from "@angular/http";

import { Project } from "../shared/models/project";
import { HttpService } from './http.service'; 
import { ExtractService }  from "./extract.service";
import {Observable} from "rxjs/Observable";

import { Routes } from './../shared/helpers/routes';

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";


import * as pptx from "pptxgenjs";


@Injectable()
export class PowerPointService {

    routes:Routes;

    constructor(private http:HttpService, private extract:ExtractService){
        this.routes=new Routes();
        pptx.setBrowser(true);
    }
    
    magenta:string="e20074";
    x:number=0.39;

    capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    createPresentation(project:Project){

       return this.http.get(this.routes.presentationImages)
        .subscribe(res=>{
    
            let response=res.json();
            let background=response.background;
            let logo=response.logo;

            pptx.setLayout('LAYOUT_16x10');

            var slide = pptx.addNewSlide();
            
        

            slide.addImage(
                { data:'image/png;base64,'+background, x:0.0, y:0.0, w:'100%', h:'100%' }
            )


            slide=this.introSlide(slide,project);
            
            this.defineMaster(project);
            let slide2=pptx.addNewSlide('MASTER_SLIDE');
            slide2.addImage(
                { data:'image/png;base64,'+logo, x:this.x, y:'92%',w:1.5,h:0.3 }
            )

            //pptx.setLayout('LAYOUT_WIDE');
            pptx.save('Case Studies '+project.name); 
        },
            error => console.log(error)
        )      
    }


    introSlide(slide,project){
        slide.addShape(pptx.shapes.RECTANGLE, { x:0.37, y:3.25, w:8, h:2, fill:this.magenta });
        
            slide.addText(
                project.name,
                { x:this.x, y:3.25, w:'100%', h:1, align:'l', font_size:40, font_face:'TELEGROTESK HEADLINE ULTRA', color:'ffffff' }
            );

            slide.addText(
                this.capitalize(project.line) + ' ('+project.program +') ',
                { x:this.x, y:3.8, w:'100%', h:1, align:'l', font_size:30, font_face:'TELEGROTESK HEADLINE', color:'ffffff' }
            );

            let now=new Date();
            slide.addText(
                now.getDate() + '.' + now.getMonth() + '.' + now.getFullYear(),
                { x:this.x, y:4.8, w:'100%', h:0.5, align:'l', font_size:14, font_face:'Tele-GroteskNor', color:'ffffff' }
            );

        return slide;
    }


    defineMaster(project){
        let now=new Date();
        let date=now.getDate() + '.' + now.getMonth() + '.' + now.getFullYear();

        pptx.defineSlideMaster({
            title: 'MASTER_SLIDE',
            bkgd:  'FFFFFF',
            objects: [
              { 'text':  { text:project.name, options:{ x:this.x, y:0.1, w:'100%', h:1, align:'l', font_size:28, font_face:'TELEGROTESK HEADLINE ULTRA', color:this.magenta } } },
              { 'text':  { text:'-Internal-', options:{ x:4.3, y:'87%', h:1, align:'l', font_size:9, font_face:'Tele-GroteskNor', color:'000000' } } },
              { 'text':  { text:'T-Systems Russia Portfolio', options:{ x:5.7, y:'87%', h:1, align:'l', font_size:9, font_face:'Tele-GroteskNor', color:'000000' } } },
              { 'text':  { text: date, options:{ x:7.8, y:'87%', h:1, align:'l', font_size:9, font_face:'Tele-GroteskNor', color:'000000' } } }
            ],
            slideNumber: { x:'95%', y:'93%', fontFace:'Tele-GroteskNor', fontSize:9, color:'000000' }
          });
    }
}