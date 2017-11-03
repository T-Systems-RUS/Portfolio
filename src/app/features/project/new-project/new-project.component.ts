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




@Component({
  selector: 'new-project',
  templateUrl: './new-project.component.html',
  styleUrls:  [
      './new-project.component.less'],
  animations: []
})
export class NewProjectComponent {

    @Input() model:Project=new Project();
    @ViewChild('entry', { read: ViewContainerRef} ) entry:ViewContainerRef; 

    msgs: Message[] = [];
    styleClass:string="";
    editMode:boolean=false;

    private lines:Array<string>;
    private domains:Array<string>;

    private errors:Object={};
    
    constructor(private dataService:ProjectService,
                private route: ActivatedRoute,
                private router:Router,
                private dynamic:DynamicService ) {}

    ngOnInit(){

        this.dataService.getConstants().subscribe(res=>{
            this.lines=res.lines;
            this.domains=res.domains;
        },error=>{
            console.log(error);
        });

        this.route.params.subscribe(params=>{
            if(params['id']){
                this.dataService.getProject(params['id']).subscribe(data=>{
                    this.model=new Project(data);
                    this.model.startdate=new Date(this.model.startdate);
                    this.model.enddate= this.model.enddate ? new Date(this.model.enddate) : undefined;
                    this.editMode=true;
                    console.log(this.model);
                    
                },err=>{
                    console.log(err);
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
            this.model.technolodgyIds=this.model.technologies.map(tech=>tech.id);
            
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
                    }
                );
            } else{
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
        modal.project=this.model;
      }

      setValue(value,prop){
          this.model[prop]=value;
          console.log(this.model)
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


}