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
    @Output() onSelect=new EventEmitter<Array<Technology>>();

    initialTechnologies:Array<Technology>=new Array<Technology>();
    technologies:Array<Technology>=new Array<Technology>();

    constructor(private dataService:TechnologyService) {
        
    }

    ngOnInit(){
        this.dataService.getTechnologies().subscribe(data=>{
            this.technologies=data;
            
            this.technologies.filter((item)=>
            this.selectedTechnologies.map(i=>i.id)
                                     .includes(item.id)).forEach(element => {
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

}
