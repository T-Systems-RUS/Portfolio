import { Component, Input,Output, EventEmitter } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls:  [
      './input.component.less',
      './../../shared/backpanel/backpanel.component.less'
    ]
})

export class InputComponent {

    @Input() id:string='';
    @Input() name:string='';
    @Input() model:string='';
    @Input() label:string='';
    @Input() wrapperStyle='';
    @Input() labelStyle='';
    @Input() boxStyle='';
    @Input() clearStyle:string='';
    @Input() placeholder:string='';
    @Input() withButton:boolean=true;
    @Input() complete:Array<any>=new Array<any>();

    @Output() onModelChanged=new EventEmitter<string>();

    completeInitial:Array<any>=new Array<any>();
    searchString:string='';

    showAutocomplete:boolean=false;
    activeItem=-1;

    constructor() {
        
    }

    ngAfterViewInit(){
        this.showAutocomplete=false;
        this.completeInitial=this.complete;

        Rx.Observable.fromEvent(document, 'keydown')
                     .pluck('key')
                     .filter(char => char==="ArrowDown" || char==="ArrowUp" || char==="Enter")
                     .subscribe(item=>this.walkThroughComplete(item,this.showAutocomplete));
    }


    modelChanged(event){
        this.searchString= this.model==='' ? '' : this.searchString;
        this.complete=this.completeInitial;
        this.complete=this.complete.filter(item=>item.toLowerCase().indexOf(event.toLowerCase())!=-1);
    }

    completeClick(data){
        this.searchString=(this.searchString+=', ' + data).replace(/(^[,\s]+)|([,\s]+$)/g, '');
        this.model=this.searchString;
    }

    clearModel(){
        this.model='';
        this.searchString='';
        this.onModelChanged.emit(this.model);
    }

    walkThroughComplete(evt,showAutocomplete){
     
        if(showAutocomplete){
            switch(evt){
                case "ArrowDown":
                this.activeItem===this.completeInitial.length-1 ? this.activeItem=0 : this.activeItem++;                  
                    break;
                case "ArrowUp":
                this.activeItem===0 ? this.activeItem=this.completeInitial.length-1 : this.activeItem--; 
                    break;
                case "Enter":
                    this.completeClick(this.completeInitial[this.activeItem]);
            }
        }
    }

    filter(){
        this.showAutocomplete=false;
        this.onModelChanged.emit(this.model);
    }

}
