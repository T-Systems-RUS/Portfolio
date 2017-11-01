import { Component, Input,Output, EventEmitter,ViewChild } from '@angular/core';
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
    @Input() complete:Array<any>=new Array<any>();

    @Input() errorMessage:string=""; //Field is required
    @Input() controlType:string="input";

    @Output() onModelChanged=new EventEmitter<Object>();
    

    @ViewChild('searchBox') searchBox;

    completeInitial:Array<any>=new Array<any>();
    searchString:string='';

    showAutocomplete:boolean=false;
    activeItem=-1;

    hasComplete:boolean=false;

    constructor() {
        
    }
    

 

    ngAfterViewInit(){

        setTimeout(function() {
            this.showAutocomplete=false;
            this.completeInitial=this.complete;      
            this.hasComplete=this.complete.length>0;
         
    
            Rx.Observable.fromEvent(document, 'keydown')
                         .pluck('key')
                         .filter(char => char==="ArrowDown" || char==="ArrowUp" || char==="Enter")
                         .subscribe(item=>this.walkThroughComplete(item,this.showAutocomplete));
        }.bind(this), 200);
    }

    ngAfterContentInit(){
        
    }


    modelChanged(event){
        if(this.hasComplete){
            this.showAutocomplete=true;
            this.complete=this.completeInitial;
            let filtered=this.complete.filter(item=>item.toLowerCase().indexOf(event.toLowerCase())!=-1);
            this.complete=filtered.length>0 ? filtered : ["No results found"];           
        }
        
        this.errorMessage='';
        this.onModelChanged.emit(this.model);
    }

    blurInput(){
        setTimeout(function() {
            this.showAutocomplete = false;
        }.bind(this), 200);
    }

    completeClick(data){
        console.log(data);
        //this.searchString=(this.searchString+=', ' + data).replace(/(^[,\s]+)|([,\s]+$)/g, '');
        this.model=data;//this.searchString;
        this.modelChanged(data);
        this.showAutocomplete=false;
    }

    clearModel(){
        this.model='';
        this.activeItem=-1;
        this.modelChanged(this.model);
        this.searchBox.nativeElement.focus();
        this.onModelChanged.emit(this.model);
    }



    walkThroughComplete(evt,showAutocomplete){
     
        if(showAutocomplete){
            switch(evt){
                case "ArrowDown":
                    this.activeItem===this.complete.length-1 ? this.activeItem=0 : this.activeItem++;              
                    break;
                case "ArrowUp":
                    this.activeItem===0 ? this.activeItem=this.complete.length-1 : this.activeItem--;                     
                    break;
                case "Enter":
                    let selected=this.activeItem<0 ? this.model : this.complete[this.activeItem];
                    
                    this.model=selected; 
                    this.modelChanged(selected);
                    this.onModelChanged.emit(selected);

                    this.activeItem=-1;
                    this.showAutocomplete=false;
            }
        }
    }

   

    filter(){
        this.showAutocomplete=false;
        this.onModelChanged.emit(this.model);
    }

}
