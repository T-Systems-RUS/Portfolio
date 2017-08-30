import { Component, Input } from '@angular/core';
import { Employee } from '../../../shared/models/employee';


@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls:  [
      './list-item.component.less']
})
export class ListItemComponent {

    @Input() model:Employee=new Employee();
    
    
    constructor() {
        
    }
    
    ngAfterViewInit(){

    }
}