import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Employee } from '../../../shared/models/employee';
import { Role } from '../../../shared/models/role';
import { Schedule } from '../../../shared/models/schedule';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls:  [
      './list-item.component.less']
})
export class ListItemComponent {

    @Input() model:Employee=new Employee();
    @Input() roles:Array<Role>=new Array<Role>();

    @Input() itemStyle:string='';

    @Input() clickable:boolean=false;
    @Output() clicked=new EventEmitter<Employee>();

    active=false;
    output:Schedule;
    
    constructor() {
        
    }
    
    ngAfterViewInit(){
        this.output=new Schedule({
            roleid:this.roles.length>0 ? this.roles[0].id : new Role().id
        });
    }

    performCLick(value:Employee){
        console.log(this.output)
        if(this.clickable){
            
            value.active=!value.active;
            value.participation=value.active ? 100.00 :0.0; 
            this.clicked.emit(value);
        }
    }

    stopAction($event){
        $event.stopPropagation();
    }

    selectRole($event){
        this.output.roleid=($event.target.value);
    }
}