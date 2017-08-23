import { Component, Input } from '@angular/core';
import { BACKPANEL_ANIMATION } from './backpanel.animation';
import * as Rx from 'rxjs/Rx';


@Component({
  selector: 'backpanel',
  templateUrl: './backpanel.component.html',
  styleUrls:  ['./backpanel.component.less'],
  animations: BACKPANEL_ANIMATION
})
export class BackPanelComponent {

    @Input() color:string='';
    @Input() image:string='left';
    @Input() withAnimation:boolean=false;

    constructor() {
        
    }

    ngAfterViewInit(){
      // let search=document.querySelector('div#search');
      // let scroll=Rx.Observable.fromEvent(document,'scroll');
      // console.log(search);

      // scroll.subscribe((evt)=>{
      //   let top=search.getBoundingClientRect().top;
        
      //   if(top<=63){
      //     search.classList.add('backpanel__search--fixed');
      //     console.log(top,'more');
      //   }else{
      //     search.classList.remove('backpanel__search--fixed');
      //     console.log(top,'less');
      //   }

      // })
    }


}

