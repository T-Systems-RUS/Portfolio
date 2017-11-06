import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Employee } from '../../../shared/models/employee';


@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls:  [
      './list-item.component.less']
})
export class ListItemComponent {

    @Input() model:Employee=new Employee();
    @Input() itemStyle:string='';

    @Input() clickable:boolean=false;
    @Output() clicked=new EventEmitter<Employee>();

    active=false;
    
    constructor() {
        
    }
    
    ngAfterViewInit(){

    }

    performCLick(value:Employee){
        if(this.clickable){
            
            value.active=!value.active;
            value.participation=value.active ? 100.00 :0.0; 
            this.clicked.emit(value);
        }
    }
}