import { Component, Input, Output, EventEmitter } from '@angular/core';
import  { Technology }  from './../../../shared/models/technology';

import {TechnologyService} from './../technology.service';

@Component({
  selector: 'technology-picker',
  templateUrl: './technology-picker.component.html',
  styleUrls:  ['./technology-picker.component.less'],
})
export class TechnologyPickerComponent {

    @Input() selectedTechnologies:Array<Technology>=new Array<Technology>();
    @Input() selected:string;
    @Input() pickerStyle:string="";
    @Input() searchStyle:string="";
    @Input() clearStyle:string="";

    @Output() onSelect=new EventEmitter<Array<Technology>>();

    initialTechnologies:Array<Technology>=new Array<Technology>();
    technologies:Array<Technology>=new Array<Technology>();

    constructor(private dataService:TechnologyService) {
        
    }

    ngOnInit(){
        this.dataService.getTechnologies().subscribe(data=>{
            this.technologies=data;
            if(this.selected) this.selectedTechnologies=[...this.selectedTechnologies,new Technology({name:this.selected})]
            console.log(this.selected)
            console.log(this.selectedTechnologies)
          
            this.technologies.filter((item)=>
            this.selectedTechnologies.map(i=>i.name)
                                     .includes(item.name)).forEach(element => {
                                        element.active=true;  
                                     });

            let selected=this.technologies.filter(item=>item.active);
            this.onSelect.emit(selected);

            this.initialTechnologies=this.technologies;
        }, error=>{
            console.log(error);
        })
    }

    filterTechnologies(event){
        
      this.technologies=this.initialTechnologies;
      this.technologies=this.technologies.filter(item=>item.name.toLowerCase().indexOf(event.toLowerCase())!=-1);
    }

    selectTechnology(event){
        let tech=this.initialTechnologies.filter(item=>item.name===event)[0];
        tech.active=!tech.active;

        let selected=this.technologies.filter(item=>item.active);
        this.onSelect.emit(selected);
    }

    clearSelect(){
        this.technologies.forEach(tech=>tech.active=false);
    }

}

