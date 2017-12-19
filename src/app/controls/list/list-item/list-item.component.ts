import { Component, Input, Output,EventEmitter, AfterContentInit } from '@angular/core';
import { Employee } from '../../../shared/models/employee';
import { Role } from '../../../shared/models/role';
import { Schedule } from '../../../shared/models/schedule';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls:  [
      './list-item.component.less']
})
export class ListItemComponent implements AfterContentInit {

    @Input() model:Schedule=new Schedule();
    @Input() roles:Array<Role>=new Array<Role>();

    @Input() itemStyle:string='';
    @Input() headingStyle:string='';

    @Input() clickable:boolean=false;
    @Output() clicked=new EventEmitter<Schedule>();

    active=false;
   // @Input() output:Schedule=new Schedule();
    
    constructor() {
        
    }

    ngAfterContentInit(){
        this.model.role=this.model.role.id==='' ? this.roles[0] : this.model.role;
    }

    performCLick(value:Schedule){
        
        if(this.clickable){          
            value.active=!value.active;
            value.participation = value.active ? 100.00 :0.0; 
            this.clicked.emit(this.model);
        }
    }

    stopAction($event){
        $event.stopPropagation();
    }

    selectRole($event){
        this.model.role=this.roles.filter(item=>item.id==$event.target.value)[0]; 
        this.model.active=true; 
        this.model.participation=100.00;
        this.clicked.emit(this.model);     
    }
}