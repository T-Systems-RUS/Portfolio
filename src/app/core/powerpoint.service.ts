import {Output, EventEmitter, Injectable} from "@angular/core";
import {Response, URLSearchParams} from "@angular/http";

import { Project } from "../shared/models/project";
import { HttpService } from './http.service'; 
import { ExtractService }  from "./extract.service";
import {Observable} from "rxjs/Observable";

import { Routes } from './../shared/helpers/routes';

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";


import   pptx  from "pptxgenjs";
import { retry } from "rxjs/operator/retry";


@Injectable()
export class PowerPointService {

    routes:Routes;

    constructor(private http?:HttpService, private extract?:ExtractService){
        this.routes=new Routes();
        pptx.setBrowser(true);
    }
    
    magenta:string="e20074";
    x:number=0.39;

    capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    getDate(date:Date){
        let newDate= date ? new Date(date) : null;
        let parsed=newDate ? newDate.getDate() + '.'+ newDate.getMonth() + '.' + newDate.getFullYear() : '';
        return parsed;
    }

    addSlide(project:Project){
        
   

        
    }


    createPresentation(project:Project, saveToClient=false){
        return this.http.get(this.routes.presentationImages + project.id)
         .subscribe(res=>{
     
             let response=res.json();
             let header=response.header;
             let header2=response.header2;
             let domain=response.domain;
             let image=response.image;
             let technologies=response.technologies;
 

             pptx.setLayout('LAYOUT_4x3');
 
             var slide = pptx.addNewSlide();
             
         
            //header 
             slide.addImage(
                 { data:'image/png;base64,'+header, x:0.0, y:0.0, w:'100%', h:'0.5' }
             )

            slide.addImage(
                { data:'image/png;base64,'+header2, x:0.0, y:0.0, w:'100%', h:'0.5' }
            )

            if(domain){
                slide.addImage(
                    { data:'image/png;base64,'+domain, x:'92%', y:'0.05', w:'0.45', h:'0.45' }
                )
            }

            slide.addText(
                project.name,
                { x:this.x, y:0.0, w:'100%', h:0.5, align:'l', valign:'middle', font_size:28, font_face:'TELEGROTESK HEADLINE ULTRA', color:'7F7F7F' }
            )

            slide.addText(
                'Description of Project',
                { x:this.x, y:0.6, w:'50%', h:0.5, align:'l', valign:'middle', font_size:18, font_face:'TELEGROTESK HEADLINE ULTRA', color:this.magenta }
            )

            slide.addText(
                project.description,
                { x:this.x, y:1.0, w:'50%', h:1.0, align:'l',valign:'top', font_size:14, font_face:'Tele-GroteskNor', color:'000000' }
            )

            if(image){
                slide.addImage(
                    { data:'image/png;base64,'+image, x:'60%', y:1.1,w:3.2,h:1.9 }
                )
            }

            // y = 3.625 for 16_9
            slide.addShape(pptx.shapes.RECTANGLE, { x:0.0, y:5.5, w:'50%', h:2.0, fill:this.magenta });
            slide.addShape(pptx.shapes.RECTANGLE, { x:'50%', y:5.5, w:'50%', h:2.0, fill:'a4a4a4' });


            //
            slide.addText(
                'Details',
                { x:this.x, y:5.45, w:'50%', h:0.5, align:'l', valign:'middle', font_size:18, font_face:'TELEGROTESK HEADLINE ULTRA', color:'ffffff' }
            )


            // y=3.9
            //duration
            let start=5.75;
            let lineheight=0.25;
            slide.addText(
                'Project duration:',
                { x:this.x, y:start, w:'50%', h:0.5, align:'l', valign:'middle', font_size:18, font_face:'Tele-GroteskNor', color:'ffffff' }
            )

            slide.addText(
                this.getDate(project.startdate) + 
                (project.enddate ? '-' : '')
                + this.getDate(project.enddate),
                { x:1.9, y:start, w:'50%', h:0.5, align:'l', valign:'middle', underline:true, font_size:18, font_face:'Tele-GroteskNor', color:'ffffff' }
            )

            //program
            slide.addText(
                'Program:',
                { x:this.x, y:start+(lineheight), w:'50%', h:0.5, align:'l', valign:'middle', font_size:18, font_face:'Tele-GroteskNor', color:'ffffff' }
            )

            slide.addText(
                project.program,
                { x:1.3, y:start+(lineheight), w:'50%', h:0.5, align:'l', valign:'middle',underline:true, font_size:18, font_face:'Tele-GroteskNor', color:'ffffff' }
            )

            //domain
            slide.addText(
                'Domain:',
                { x:this.x, y:start+(lineheight*2), w:'50%', h:0.5, align:'l', valign:'middle', font_size:18, font_face:'Tele-GroteskNor', color:'ffffff' }
            )

            slide.addText(
                project.domain,
                { x:1.3, y:start+(lineheight*2), w:'50%', h:0.5, align:'l', valign:'middle',underline:true, font_size:18, font_face:'Tele-GroteskNor', color:'ffffff' }
            )

            //Language
            let interval=0;
            let language=project.technologies.filter(tech=>tech.domain==='language');
            if(language.length){
                interval+=0.25;
                let text =language.map(item=>item.name).join(' ');
                slide.addText(
                    'Language:',
                    { x:this.x, y:start+(lineheight*3), w:'50%', h:0.5, align:'l', valign:'middle', font_size:18, font_face:'Tele-GroteskNor', color:'ffffff' }
                )
    
                slide.addText(
                    text,
                    { x:1.4, y:start+(lineheight*3), w:'50%', h:0.5, align:'l', valign:'middle',underline:true, font_size:18, font_face:'Tele-GroteskNor', color:'ffffff' }
                )
            }

            //Methology
            let methodology=project.technologies.filter(tech=>tech.domain==='methodology');
            if(methodology.length){
                let text =methodology.map(item=>item.name).join(' ');
                slide.addText(
                    'Methodology:',
                    { x:this.x, y:start+(lineheight*3)+interval, w:'50%', h:0.5, align:'l', valign:'middle', font_size:18, font_face:'Tele-GroteskNor', color:'ffffff' }
                )
    
                slide.addText(
                    text,
                    { x:1.7, y:start+(lineheight*3)+interval, w:'50%', h:0.5, align:'l', valign:'middle',underline:true, font_size:18, font_face:'Tele-GroteskNor', color:'ffffff' }
                )
            }


            let backend=technologies.filter(item=>item.domain==='backend');
            let frontend=technologies.filter(item=>item.domain==='frontend');

            let headerY=5.45;
            let iconY=5.9;
            let textY=6.1;

            if(backend.length){
                slide.addText(
                    'Back-end',
                    { x:5.1, y:headerY, w:'50%', h:0.5, align:'l', valign:'middle', font_size:18, font_face:'TELEGROTESK HEADLINE ULTRA', color:'ffffff' }
                )

                let bside=5.2;
                let bsidetext=5.1;
                for(let item of backend){
                    slide.addImage(
                        { data:'image/png;base64,'+item.image, x:bside, y:iconY, w:0.4, h:0.3 }
                    )

                    slide.addText(
                        item.name,
                        { x:bsidetext, y:textY, w:'50%', h:0.5, align:'l', valign:'middle', font_size:14, font_face:'Tele-GroteskNor', color:'ffffff' }
                    )

                    bside+=0.7;
                    bsidetext+=0.7;                   
                }

                headerY+=0.95;
                iconY+=0.95;
                textY+=0.95;
            }

            if(frontend.length){
                slide.addText(
                    'Front-end',
                    { x:5.1, y:headerY, w:'50%', h:0.5, align:'l', valign:'middle', font_size:18, font_face:'TELEGROTESK HEADLINE ULTRA', color:'ffffff' }
                )

                let bside=5.2;
                let bsidetext=5.1;
                for(let item of frontend){
                    slide.addImage(
                        { data:'image/png;base64,'+item.image, x:bside, y:iconY, w:0.4, h:0.3 }
                    )

                    slide.addText(
                        item.name,
                        { x:bsidetext, y:textY, w:'50%', h:0.5, align:'l', valign:'middle', font_size:14, font_face:'Tele-GroteskNor', color:'ffffff' }
                    )

                    bside+=0.7;
                    bsidetext+=0.7;
                }
            }


            if(saveToClient) pptx.save('Case Studies '+project.name); 

         },
             error => {
                 console.log(error);
                 Observable.throw(this.extract.handlePostError(error));
             }
         )      
     }

    // createPresentation(project:Project){
    //    return this.http.get(this.routes.presentationImages + project.image)
    //     .subscribe(res=>{
    
    //         let response=res.json();
    //         let background=response.background;
    //         let logo=response.logo;
    //         let image=response.image;

    //         console.log(res.json())

    //         pptx.setLayout('LAYOUT_16x09');

    //         var slide = pptx.addNewSlide();
            
        

    //         slide.addImage(
    //             { data:'image/png;base64,'+background, x:0.0, y:0.0, w:'100%', h:'100%' }
    //         )

    //         //first slide
    //         slide=this.introSlide(slide,project);
            
    //         //second slide
    //         this.defineMaster(project);
    //         let slide2=pptx.addNewSlide('MASTER_SLIDE');
    //         slide2.addImage(
    //             { data:'image/png;base64,'+logo, x:this.x, y:'92%',w:1.5,h:0.3 }
    //         )

    //         if(image){
    //             slide2.addImage(
    //                 { data:'image/png;base64,'+image, x:this.x, y:2.3,w:3.0,h:1.5 }
    //             )

    //             slide2.addText(
    //                 'Description of Project',
    //                 { x:3.5, y:0.9, w:5.5, h:'100%', align:'l',valign:'top', font_size:20, font_face:'TELEGROTESK HEADLINE ULTRA', color:'A6A6A6' }
    //             )

    //             slide2.addText(
    //                 project.description,
    //                 { x:3.5, y:1.3, w:5.5, h:'100%', align:'l',valign:'top', font_size:14, font_face:'Tele-GroteskNor', color:'000000' }
    //             )
    //         }else{
    //             slide2.addText(
    //                 'Description of Project',
    //                 { x:this.x, y:0.9, w:8.7, h:'100%', align:'l',valign:'top', font_size:20, font_face:'TELEGROTESK HEADLINE ULTRA', color:'A6A6A6' }
    //             )

    //             slide2.addText(
    //                 project.description,
    //                 { x:this.x, y:1.3, w:8.7, h:'100%', align:'l',valign:'top', font_size:14, font_face:'Tele-GroteskNor', color:'000000' }
    //             )
    //         }


    //         //slide 3
    //         let slide3=pptx.addNewSlide('MASTER_SLIDE');
    //         slide3.addImage(
    //             { data:'image/png;base64,'+logo, x:this.x, y:'92%',w:1.5,h:0.3 }
    //         );

    //         let backbottom=0.9;
    //         let frontbottom=0.9;
    //         let bottom=0.9;
    //         let lineheight=0.25;

    //         if(project.technologies.length){
    //             let backend=project.technologies.filter(item=>item.domain==='backend');
    //             let frontend=project.technologies.filter(item=>item.domain==='frontend');
    //             let language=project.technologies.filter(tech=>tech.domain==='language');
    //             let methodology=project.technologies.filter(tech=>tech.domain==='methodology');
    //             let information=project.technologies.filter(tech=>tech.domain==='information');

                
               

    //             if(backend.length){
    //                 slide3.addText(
    //                     'Technologies/Back-end:',
    //                     { x:this.x, y:0.9, w:4.0, h:'100%', align:'l',valign:'top', font_size:20, font_face:'TELEGROTESK HEADLINE ULTRA', color:'A6A6A6' }
    //                 )

    //                 let y=1.3;
                    
    //                 backbottom=1.3+(lineheight*backend.length);
    //                 for(let tech of backend){

    //                     slide3.addText(
    //                         tech.name,
    //                         { x:this.x, y:y, w:4.0, h:1.0, align:'l',valign:'top', font_size:13, font_face:'Tele-GroteskNor', color:'000000' }
    //                     )

    //                     y+=lineheight;
    //                 }
    //             }

    //             if(frontend.length){
    //                 let x=backend.length ? 5.0 : this.x;
    //                 let y=1.3;              
    //                 let name=backend.length ? 'Front-end:' : 'Technologies/Front-end:';
                    
    //                 slide3.addText(
    //                     name,
    //                     { x:x, y:0.9, w:4.0, h:'100%', align:'l',valign:'top', font_size:20, font_face:'TELEGROTESK HEADLINE ULTRA', color:'A6A6A6' }
    //                 )

    //                 frontbottom=1.3+(lineheight*frontend.length);
    //                 for(let tech of frontend){
    //                     slide3.addText(
    //                         tech.name,
    //                         { x:x, y:y, w:4.0, h:1.0, align:'l',valign:'top', font_size:13, font_face:'Tele-GroteskNor', color:'000000' }
    //                     )

    //                     y+=lineheight;
    //                 }
                    
    //             }


    //             let bottom = backbottom>frontbottom ? backbottom : backbottom===frontbottom ? backbottom : frontbottom;

    //             if(methodology.length){
                    

    //                 bottom+=lineheight;
    //                 slide3.addText(
    //                     'Methodology:',                       
    //                     { x:this.x, y:bottom, w:2.2, h:'100%', align:'l',valign:'top', font_size:20, font_face:'TELEGROTESK HEADLINE ULTRA', color:this.magenta }
    //                 );

    //                 let text =methodology.map(item=>item.name).join(' ');
    //                 slide3.addText(
    //                     text,
    //                     { x:2.4, y:bottom, w:4.0, h:1.0, align:'l',valign:'top', font_size:20, font_face:'Tele-GroteskNor', color:'000000' }
    //                 )

    //                 bottom=bottom+(lineheight*methodology.length);
    //             }

    //             if(language.length){

    //                 bottom+=lineheight;
    //                 slide3.addText(
    //                     'Language:',                       
    //                     { x:this.x, y:bottom, w:2.2, h:'100%', align:'l',valign:'top', font_size:20, font_face:'TELEGROTESK HEADLINE ULTRA', color:this.magenta }
    //                 );

    //                 let text =language.map(item=>item.name).join(' ');
    //                 slide3.addText(
    //                     text,
    //                     { x:2.4, y:bottom, w:4.0, h:1.0, align:'l',valign:'top', font_size:20, font_face:'Tele-GroteskNor', color:'000000' }
    //                 )

    //                 bottom=bottom+(lineheight*methodology.length);
    //             }

    //             console.log(backbottom,frontbottom)
                
    //         }

   
    //         // if(project.customer){
    //         //     bottom+=lineheight;
    //         //     slide3.addText(
    //         //         'End Customer:',                       
    //         //         { x:this.x, y:bottom, w:2.2, h:'100%', align:'l',valign:'top', font_size:20, font_face:'TELEGROTESK HEADLINE ULTRA', color:this.magenta }
    //         //     );


    //         //     slide3.addText(
    //         //         project.customer,
    //         //         { x:2.4, y:bottom, w:4.0, h:1.0, align:'l',valign:'top', font_size:20, font_face:'Tele-GroteskNor', color:'000000' }
    //         //     )

    //         //     bottom=bottom+lineheight;
    //         // }
            

    //         pptx.save('Case Studies '+project.name); 
    //     },
    //         error => console.log(error)
    //     )      
    // }


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