import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';

@Component({
  selector: 'chip',
  templateUrl: './chip.component.html',
  styleUrls:  [
      './chip.component.less'
    ]
})
export class ChipComponent implements OnInit {

    @Input() value:string='';
    @Input() style:string='';
    @Input() clickable:boolean=false;
    @Input() isLink:boolean=false;

    @Output() clicked=new EventEmitter<string>();
    @Output() linkClicked=new EventEmitter<string>();

    @Input() active=false;
    @Input() image:string="";
    @Input() path:string="/server/images/presentation/";

    fullpath;
    
    constructor() {
        
    }

    ngOnInit(){
        //event.stopPropagation();
        this.fullpath=this.path + this.image;
    }

    performClick(value){
        if(this.clickable){
            this.active=!this.active;
            this.clicked.emit(value);
        } else{
            if(this.isLink){
                this.linkClicked.emit(value);
            }
        }
    }


}