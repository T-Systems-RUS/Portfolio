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
       return this.http.get(this.routes.presentationImages + project.image)
        .subscribe(res=>{
    
            let response=res.json();
            let background=response.background;
            let logo=response.logo;
            let image=response.image;

            console.log(res.json())

            pptx.setLayout('LAYOUT_16x10');

            var slide = pptx.addNewSlide();
            
        

            slide.addImage(
                { data:'image/png;base64,'+background, x:0.0, y:0.0, w:'100%', h:'100%' }
            )

            //first slide
            slide=this.introSlide(slide,project);
            
            //second slide
            this.defineMaster(project);
            let slide2=pptx.addNewSlide('MASTER_SLIDE');
            slide2.addImage(
                { data:'image/png;base64,'+logo, x:this.x, y:'92%',w:1.5,h:0.3 }
            )

            if(image){
                slide2.addImage(
                    { data:'image/png;base64,'+image, x:this.x, y:2.3,w:3.0,h:1.5 }
                )

                slide2.addText(
                    'Description of Project',
                    { x:3.5, y:0.9, w:5.5, h:'100%', align:'l',valign:'top', font_size:20, font_face:'TELEGROTESK HEADLINE ULTRA', color:'A6A6A6' }
                )

                slide2.addText(
                    project.description,
                    { x:3.5, y:1.3, w:5.5, h:'100%', align:'l',valign:'top', font_size:14, font_face:'Tele-GroteskNor', color:'000000' }
                )
            }else{
                slide2.addText(
                    'Description of Project',
                    { x:this.x, y:0.9, w:8.7, h:'100%', align:'l',valign:'top', font_size:20, font_face:'TELEGROTESK HEADLINE ULTRA', color:'A6A6A6' }
                )

                slide2.addText(
                    project.description,
                    { x:this.x, y:1.3, w:8.7, h:'100%', align:'l',valign:'top', font_size:14, font_face:'Tele-GroteskNor', color:'000000' }
                )
            }


            //slide 3
            let slide3=pptx.addNewSlide('MASTER_SLIDE');
            slide3.addImage(
                { data:'image/png;base64,'+logo, x:this.x, y:'92%',w:1.5,h:0.3 }
            );

            let backbottom=0.9;
            let frontbottom=0.9;
            let bottom=0.9;
            let lineheight=0.25;

            if(project.technologies.length){
                let backend=project.technologies.filter(item=>item.domain==='backend');
                let frontend=project.technologies.filter(item=>item.domain==='frontend');
                let language=project.technologies.filter(tech=>tech.domain==='language');
                let methodology=project.technologies.filter(tech=>tech.domain==='methodology');
                let information=project.technologies.filter(tech=>tech.domain==='information');

                
               

                if(backend.length){
                    slide3.addText(
                        'Technologies/Back-end:',
                        { x:this.x, y:0.9, w:4.0, h:'100%', align:'l',valign:'top', font_size:20, font_face:'TELEGROTESK HEADLINE ULTRA', color:'A6A6A6' }
                    )

                    let y=1.3;
                    
                    backbottom=1.3+(lineheight*backend.length);
                    for(let tech of backend){

                        slide3.addText(
                            tech.name,
                            { x:this.x, y:y, w:4.0, h:1.0, align:'l',valign:'top', font_size:13, font_face:'Tele-GroteskNor', color:'000000' }
                        )

                        y+=lineheight;
                    }
                }

                if(frontend.length){
                    let x=backend.length ? 5.0 : this.x;
                    let y=1.3;              
                    let name=backend.length ? 'Front-end:' : 'Technologies/Front-end:';
                    
                    slide3.addText(
                        name,
                        { x:x, y:0.9, w:4.0, h:'100%', align:'l',valign:'top', font_size:20, font_face:'TELEGROTESK HEADLINE ULTRA', color:'A6A6A6' }
                    )

                    frontbottom=1.3+(lineheight*frontend.length);
                    for(let tech of frontend){
                        slide3.addText(
                            tech.name,
                            { x:x, y:y, w:4.0, h:1.0, align:'l',valign:'top', font_size:13, font_face:'Tele-GroteskNor', color:'000000' }
                        )

                        y+=lineheight;
                    }
                    
                }


                let bottom = backbottom>frontbottom ? backbottom : backbottom===frontbottom ? backbottom : frontbottom;

                if(methodology.length){
                    

                    bottom+=lineheight;
                    slide3.addText(
                        'Methodology:',                       
                        { x:this.x, y:bottom, w:2.2, h:'100%', align:'l',valign:'top', font_size:20, font_face:'TELEGROTESK HEADLINE ULTRA', color:this.magenta }
                    );

                    let text =methodology.map(item=>item.name).join(' ');
                    slide3.addText(
                        text,
                        { x:2.4, y:bottom, w:4.0, h:1.0, align:'l',valign:'top', font_size:20, font_face:'Tele-GroteskNor', color:'000000' }
                    )

                    bottom=bottom+(lineheight*methodology.length);
                }

                if(language.length){

                    bottom+=lineheight;
                    slide3.addText(
                        'Language:',                       
                        { x:this.x, y:bottom, w:2.2, h:'100%', align:'l',valign:'top', font_size:20, font_face:'TELEGROTESK HEADLINE ULTRA', color:this.magenta }
                    );

                    let text =language.map(item=>item.name).join(' ');
                    slide3.addText(
                        text,
                        { x:2.4, y:bottom, w:4.0, h:1.0, align:'l',valign:'top', font_size:20, font_face:'Tele-GroteskNor', color:'000000' }
                    )

                    bottom=bottom+(lineheight*methodology.length);
                }

                console.log(backbottom,frontbottom)
                
            }

   
            // if(project.customer){
            //     bottom+=lineheight;
            //     slide3.addText(
            //         'End Customer:',                       
            //         { x:this.x, y:bottom, w:2.2, h:'100%', align:'l',valign:'top', font_size:20, font_face:'TELEGROTESK HEADLINE ULTRA', color:this.magenta }
            //     );


            //     slide3.addText(
            //         project.customer,
            //         { x:2.4, y:bottom, w:4.0, h:1.0, align:'l',valign:'top', font_size:20, font_face:'Tele-GroteskNor', color:'000000' }
            //     )

            //     bottom=bottom+lineheight;
            // }
            

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

            let now=new Date(project.updatedAt);

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