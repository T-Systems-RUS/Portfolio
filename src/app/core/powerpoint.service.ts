import {Output, EventEmitter, Injectable} from "@angular/core";
import {Response, URLSearchParams} from "@angular/http";

import { Project } from "../shared/models/project";



import * as pptx from "pptxgenjs";


@Injectable()
export class PowerPointService {



    constructor(){
        pptx.setBrowser(true);
    }
    


    createPresentation(project:Project) /*:Observable<Project>*/{
       // var pptx = new pptx();
      
        var slide = pptx.addNewSlide();
        slide.addText(
          project.name,
          { x:0.0, y:0.25, w:'100%', h:1.5, align:'c', font_size:24, color:'0088CC', fill:'F1F1F1' }
        );
        pptx.setLayout('LAYOUT_WIDE');
        pptx.save('Demo');  
    }
}