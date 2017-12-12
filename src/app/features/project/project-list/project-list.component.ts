import { Component, Input, ViewChild,AfterContentInit } from '@angular/core';
import { TechnologyPickerComponent } from '../../technology/technology-picker/technology-picker.component';
import { Project } from '../../../shared/models/project';
import { Employee } from '../../../shared/models/employee';
import { Technology } from '../../../shared/models/technology';
//import { Schedule } from '../../../shared/models/schedule';
import { Constants } from '../../../shared/models/constants';
import { ProjectService } from '../project.service';
import { PowerPointService } from '../../../core/powerpoint.service';
import { LIST_ANIMATION } from './project-list.animation';
import { ActivatedRoute,Router } from '@angular/router';
import { retry } from 'rxjs/operator/retry';

import * as _ from 'lodash';
//import { Schedule } from 'primeng/primeng';



@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls:  [
      './project-list.component.less'],
  animations:LIST_ANIMATION
})

export class ProjectListComponent implements AfterContentInit {

    @Input() projects:Array<Project>=new Array<Project>();
    @Input() sortOrder:boolean=true;
    @ViewChild(TechnologyPickerComponent) technologyPicker:TechnologyPickerComponent;

    filteredProjects:Array<Project>=new Array<Project>();

    tooltipVisible:boolean=true;
    complete:Array<string>=new Array<string>();

    //initial project list
    initialProjects:Array<Project>=new Array<Project>();
    sortProperty:string='';
    selectedTechnology:string='';

    //constants
    constants=new Constants();
    //filter checkboxes
    line=new Array<string>();
    type=new Array<string>();
    program=new Array<string>();
    domain=new Array<string>();
    customer=new Array<string>();
    technologies=new Array<Technology>();

    filter:any=new Object();

    constructor(private dataService:ProjectService,
                public router: Router,
                private route:ActivatedRoute,
                private powerpoint:PowerPointService) {

    }

    ngOnInit(){
        this.dataService.getConstants().subscribe(res=>{
            this.constants.lines=res.lines;
            this.constants.domains=res.domains;
            this.constants.types=res.types;
            this.constants.programs=res.programs;
        },error=>{
            console.log(error);
        });

        this.dataService.getProjects().subscribe(data=>{
            this.projects=data;
            this.projects.forEach(item=>item.teamcount=item.schedules.length);
            this.constants.customers=new Set(
                this.projects.map(item=>item.customer).filter(p=>p!=="" && p).sort()
            );

            console.log(this.projects);
            
            this.initialProjects=this.projects;
            this.complete= this.refreshCompleteList(this.projects);
        },err=>{
            console.log(err);
        })
    }

    ngAfterViewInit(){
        setTimeout(()=> {
            this.filteredProjects=this.projects;             
        }, 0);     
    }

    ngAfterContentInit(){
        this.route.queryParams.subscribe(params=>{
            console.log('conternt init')
            if(!_.isEmpty(params)){
                for(let key of Object.keys(params)){
                    let parameter=params[key];
                    if(key==='technologies') this.selectedTechnology=parameter;
                    this[key].push(parameter);
                    this.check(parameter,key);
                }                
            }
        })
    }

    isAssending:boolean=false;
    sortProjects(event){
        this.isAssending=!this.isAssending;
        this.projects.sort(this.propComparator(event,this.isAssending));
        this.sortProperty=event;
    }

    propComparator(prop,isAssending) {
        return function(a, b) {
            if(isAssending){
                return a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1;
            } else{
                return b[prop] > a[prop] ? 1 : a[prop] === b[prop] ? 0 : -1;
            }
            
        }
    }

      filterProjects(event){
        this.clearFilters();
        this.projects=this.initialProjects;
        this.projects=this.projects.filter(item=>item.name.toLowerCase().indexOf(event.toLowerCase())!=-1);
        this.complete=this.projects.map(item=>item.name);
      }

      newProject(){
          this.router.navigate(["/project/new"]);
      }

      check($event,name){
          if(this[name]){
            if(name==='technologies') this[name]=$event;
            this.filter[name]=this[name];
            this.complexFilter();
          }
      }

      complexFilter(){
          this.projects=this.initialProjects;
          
          for(let key of Object.keys(this.filter)){
            this.projects=this.projects.filter(item=>{
                if(this.filter[key].length){
                    if(Array.isArray(item[key])){
                        let ids=this.filter[key].map(item=>item.id);
                        return item[key].map(item=>item.id).filter(elem=>{                          
                            return ids.indexOf(elem)>-1
                        }).length==ids.length;
                    } else{
                        return this.filter[key].indexOf(item[key])>-1
                    }
                } else{
                    return item;
                }
            })
          }
          this.complete= this.refreshCompleteList(this.projects);
      }

      clearFilters(){
        this.line=[]
        this.type=[]
        this.program=[];
        this.domain=[];
        this.technologies=[];
        this.filter=new Object();
        this.projects=this.initialProjects;
        this.technologyPicker.clearSelect();
      }

      refreshCompleteList(projects) :Array<any> {
        return Array.from(new Set(projects.map(item=>item.name)));
      }


      createPresentation(){
        for(let i=0;i<this.projects.length;i++){
            let saveToClient=i===this.projects.length-1 ? true :false;
            this.powerpoint.createPresentation(this.projects[i],saveToClient);
        } 
      }
}