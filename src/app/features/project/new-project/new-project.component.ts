import { Component, Input } from '@angular/core';
import { Project } from '../../../shared/models/project';
import { Technology } from '../../../shared/models/technology';
import {Employee } from '../../../shared/models/employee';
import { ProjectService } from '../project.service';

import {Message} from 'primeng/components/common/api';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'new-project',
  templateUrl: './new-project.component.html',
  styleUrls:  [
      './new-project.component.less'],
  animations: []
})
export class NewProjectComponent {

    @Input() model:Project=new Project();
    
    //initial employee list
    employees;
    initialEmployees:Array<Employee>=new Array<Employee>();
    //initial tech list
    technologies;
    initialTechnologies:Array<Technology>=new Array<Technology>();

    msgs: Message[] = [];
    dateValue:Date;
    styleClass:string="";
    editMode:boolean=false;

    private lines:Array<string>;
    private domains:Array<string>;

    private errors:Object={};
    
    constructor(private dataService:ProjectService,
                private route: ActivatedRoute,
                private router:Router) {
    }

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
                    this.editMode=true;
                    console.log(this.model)
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

    
    


    //   filterTechnologies(event){
          
    //     this.technologies=this.initialTechnologies;
    //     this.technologies=this.technologies.filter(item=>item.name.toLowerCase().indexOf(event.toLowerCase())!=-1);
    //   }

    //   selectTechnology(event){
    //       let tech=this.initialTechnologies.filter(item=>item.name===event)[0];
    //       tech.active=!tech.active;
    //   }


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
                        //this.router.navigate(["/project/",data.id]);
                        console.log(data)
                    },
                    error=>{console.log('error',error)}
                );
            } else{
                this.dataService.createProject(this.model).subscribe(
                    data=>{/*this.router.navigate(["/projects/");*/},
                    error=>{console.log('error',error)}
                );
            }
        } 
      }

      setValue(value,prop){
          this.model[prop]=value;
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