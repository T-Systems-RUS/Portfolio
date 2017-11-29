import { Component, Input,ViewChild,ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Project } from '../../../shared/models/project';
import { Technology } from '../../../shared/models/technology';

import { DynamicService } from '../../../core/dynamic.service';
import { PowerPointService } from '../../../core/powerpoint.service';
import { ProjectService } from '../project.service';


import { PROJECT_ANIMATION } from './project.animation';


@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls:  [
      './project.component.less'],
  animations: [PROJECT_ANIMATION]
})
export class ProjectComponent {

    model:Project=new Project();
    @ViewChild('entry', { read: ViewContainerRef} ) entry:ViewContainerRef;
    
    id:number;
    backend:Array<Technology>=new Array<Technology>();
    frontend:Array<Technology>=new Array<Technology>();
    methodology:Array<Technology>=new Array<Technology>();
    language:Array<Technology>=new Array<Technology>();
    information:Array<string>=new Array<string>();

    ribbonVisible:boolean=false;
    
    constructor(private dataService:ProjectService,
                private route: ActivatedRoute,
                private router:Router,
                private dynamic:DynamicService,
                private powerpoint:PowerPointService) {
        
    }

    ngOnInit(){
        this.route.params.subscribe(params=>{
            this.id=+params['id'];

            this.dataService.getProject(this.id).subscribe(data=>{
                this.model=new Project(data);
                this.backend=this.model.technologies.filter(tech=>tech.domain==='backend');
                this.frontend=this.model.technologies.filter(tech=>tech.domain==='frontend');
                this.language=this.model.technologies.filter(tech=>tech.domain==='language');
                this.methodology=this.model.technologies.filter(tech=>tech.domain==='methodology');
                this.information=this.model.technologies.filter(tech=>tech.domain==='information').map(item=>item.name);
                if(this.model.pss) this.information.push("PSS " + (this.model.pss));


                if(this.model.enddate){
                    this.ribbonVisible=new Date(this.model.enddate)<=new Date();
                }
                
                
                console.log(this.model);    
            },error=>{
                this.dynamic.setRootViewContainerRef(this.entry);
                let modal=this.dynamic.addErrorComponent();
                modal.error=error;
                this.model.line="grey";
            })
            console.log(this.model);
        })

        
    }


    archieveProject(){
        this.dynamic.setRootViewContainerRef(this.entry);
        let modal=this.dynamic.addDeleteComponent();
        modal.type="Project";
        modal.name=this.model.name;

        modal.confirmed.subscribe(action=>{
            modal.visible=false;
            this.dataService.archieveProject(this.model).subscribe(
                data=>{
                    this.router.navigate(["/projects"]);
                    console.log(data)
                },
                error=>{
                    this.dynamic.setRootViewContainerRef(this.entry);
                    let modal=this.dynamic.addErrorComponent();
                    modal.error=error;
                }
            )
        })
    }

    showUpload(){
        this.dynamic.setRootViewContainerRef(this.entry);
        let modal=this.dynamic.addFileComponent();
        modal.project=this.model;

        modal.onUploaded.subscribe(image=>{
            this.model.image=image;
            console.log(this.model.image);
            modal.visible=false;
        })

        modal.onErrors.subscribe(error=>{
            this.dynamic.setRootViewContainerRef(this.entry);
            let modal=this.dynamic.addErrorComponent();
            modal.error=error;
        })
    }


    createPresentation(){
        this.powerpoint.createPresentation(this.model)
    }

}