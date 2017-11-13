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
    @Output() clicked=new EventEmitter<Schedule>();

    active=false;
    @Input() output:Schedule=new Schedule();
    
    constructor() {
        
    }


    
    ngAfterViewInit(){
        setTimeout(()=>{
            this.output.role=this.roles.length>0 ? this.roles[0] : new Role()
        },0);
    }

    performCLick(value:Employee){
        
        if(this.clickable){          
            value.active=!value.active;
            this.output.active=!this.output.active;
            this.output.participation = this.output.active ? 100.00 :0.0; 
            this.output.employee=value;
            console.log(this.output)
            this.clicked.emit(this.output);
        }
    }

    stopAction($event){
        $event.stopPropagation();
    }

    selectRole($event){
        this.output.role=this.roles.filter(item=>item.id==$event.target.value)[0];
        console.log(this.output.role)
    }
}