import { Component, Input, EventEmitter, Output, ElementRef,HostListener} from '@angular/core';


@Component({
  selector: 'filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls:  [
      './filter-item.component.less'
    ],
  host:{
        '(document:click)': 'onClick($event)'
  }
})

export class FilterItemComponent {

    @Input() name:string='';
    @Input() withTooltip:boolean=false;
    @Input() tooltipVisible:boolean=false;
    @Input() filterStyle:string="";
    @Input() tooltipStyle:string="";
    @Input() wrapperStyle:string="";

    @Output() onFilterAction=new EventEmitter<string>(); 

    

    constructor(private _eref: ElementRef) {
        
    }

    ngAfterViewInit(){

    }

    filterClick(type:string){
        this.onFilterAction.emit(this.name);
    }

    @HostListener('document:click', ['$event'])
    onClick(event) {
       if(!this._eref.nativeElement.contains(event.target)){
            this.tooltipVisible=false;
       }      
    }

}