//angular
import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

//models
import { Project } from '../../../shared/models/project';
import { Technology } from '../../../shared/models/technology';
import { Employee } from '../../../shared/models/employee';

//Services
import { ProjectService } from '../project.service';
import { DynamicService } from '../../../core/dynamic.service';

//primeng and third libraries
import {Message} from 'primeng/components/common/api';
import * as _ from 'lodash'; 
import { Comparer } from '../../../shared/helpers/comparer';



@Component({
  selector: 'new-project',
  templateUrl: './new-project.component.html',
  styleUrls:  [
      './new-project.component.less'],
  animations: []
})
export class NewProjectComponent  {

    @Input() 
    model:Project=new Project();
    modelCopy:Project=new Project();

    @ViewChild('entry', { read: ViewContainerRef} ) entry:ViewContainerRef; 

    msgs: Message[] = [];
    styleClass:string="";
    editMode:boolean=false;

    lines:Array<string>;
    domains:Array<string>;
    types:Array<string>;
    programs:Array<string>;

    disabled:boolean=true;
    errors:Object={};
    initialState:Project=new Project();
    
    constructor(private dataService:ProjectService,
                private route: ActivatedRoute,
                private router:Router,
                private dynamic:DynamicService ) {}

    ngOnInit(){

        this.dataService.getConstants().subscribe(res=>{
            this.lines=res.lines;
            this.domains=res.domains;
            this.types=res.types;
            this.programs=res.programs;
        },error=>{
            console.log(error);
        });

        this.route.params.subscribe(params=>{
            if(params['id']){
                this.dataService.getProject(params['id']).subscribe(data=>{
                    this.model=new Project(data);
                    //detect changes for submit button disabled
                    
                    //if no date must be undefined or date picker breaks
                    this.model.startdate=this.model.startdate ? new Date(this.model.startdate) : undefined;
                    this.model.enddate= this.model.enddate ? new Date(this.model.enddate) : undefined;

                    this.modelCopy=new Project(this.model);

                    let urlSegment=this.route.snapshot.url[1].path;
                    this.editMode= urlSegment==='update' ? true : false; 

                },error=>{
                    this.dynamic.setRootViewContainerRef(this.entry);
                    let modal=this.dynamic.addErrorComponent();
                    modal.error=error;
                    modal.action=true;
                    modal.actionPerfomed.subscribe(action=>{
                        this.router.navigate(["/projects/"]);
                    });
                })
            } else{
                this.editMode=false;
            }
            
        },error=>{
            console.log('fuck',error)
        })        
        
    }
   
    

    
    


      changeProject(){
        this.model.errors={};
        let unvalidFields=this.unvalidFields();

        if(unvalidFields.length>0){
            this.model.generateErrors(unvalidFields);

            //error style for prime ng calender
            this.styleClass=unvalidFields.filter(field=>field==="startdate").length>0 
            ? "ui-inputtext--error"
            : "";

            this.msgs.push({severity:'error', summary:'Error Message', detail:'Please fill required fields'})
        }else{
            this.model.pss=this.model.pss || 0;
            
            if(this.editMode){
                this.model.version=this.model.version+1;
                this.dataService.updateProject(this.model).subscribe(
                    data=>{
                        this.router.navigate(["/project/",data.id]);
                        console.log(data)
                    },
                    error=>{
                        this.dynamic.setRootViewContainerRef(this.entry);
                        let modal=this.dynamic.addErrorComponent();
                        modal.error=error;
                        console.log(error);
                        modal.action=true;
                        modal.actionPerfomed.subscribe(action=>{
                            this.router.navigate(["/projects/"]);
                        })
                    }
                );
            } else{
                this.model.version=1;
                this.dataService.createProject(this.model).subscribe(
                    data=>{this.router.navigate(["/projects/"])},
                    error=>{
                        this.dynamic.setRootViewContainerRef(this.entry);
                        let modal=this.dynamic.addErrorComponent();
                        modal.error=error;
                    }
                );                
            }
        } 
      }

      showPreview(){
        this.dynamic.setRootViewContainerRef(this.entry);
        let modal=this.dynamic.addProjectConfirmationComponent();
        modal.project=new Project(this.model);
      }


      setValue(value,prop){         
          this.model[prop]=value;
          this.disableSubmit();
          console.log(this.model);
      }

      unvalidFields(){
          return this.model.required.map(key=>{
              return !this.model[key] ? key : '';
          }).filter(item=>item!='');
      }


      changeLine(event){
          this.model.line=event;
      }

      back(){
          window.history.back();
      }

      disableSubmit(){
        let comparer=new Comparer();
        let diff= comparer.deepCompare(this.model,this.modelCopy);
        this.disabled= Object.keys(diff).length===0;
      }

      
}