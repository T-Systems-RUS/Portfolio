import { Component, Input, Output,EventEmitter } from '@angular/core';
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
export class ListItemComponent {

    @Input() model:Schedule=new Schedule();
    @Input() roles:Array<Role>=new Array<Role>();

    @Input() itemStyle:string='';

    @Input() clickable:boolean=false;
    @Output() clicked=new EventEmitter<Schedule>();

    active=false;
   // @Input() output:Schedule=new Schedule();
    
    constructor() {
        
    }

    ngOnInit(){
        console.log(this.model)
    }
    
    ngAfterViewInit(){
        setTimeout(()=>{
            //this.output.role=this.roles.length>0 ? this.roles[0] : new Role()
        },0);
    }

    performCLick(value:Schedule){
        
        if(this.clickable){          
            value.active=!value.active;
            //this.output.active=!this.output.active;
            value.participation = value.active ? 100.00 :0.0; 
            //this.output.employee=value;
            console.log(value)
            this.clicked.emit(this.model);
        }
    }

    stopAction($event){
        $event.stopPropagation();
    }

    selectRole($event){
        this.model.role=this.roles.filter(item=>item.id==$event.target.value)[0]; 
        this.model.active=true; 
        this.clicked.emit(this.model);     
    }
}