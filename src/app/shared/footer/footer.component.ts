import { Component, Input } from '@angular/core';
import * as Rx from 'rxjs/Rx';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls:  ['./footer.component.less']
})
export class FooterComponent {

    @Input() color:string='';


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
      var lastScrollTop = 0;
      let footer=document.querySelector('div#footer');

      window.addEventListener("scroll", function(){ 
        var st = window.pageYOffset || document.documentElement.scrollTop; 
        if (st > lastScrollTop){
            footer.classList.add('footer--visible');
            console.log('down')
        } else {
             footer.classList.remove('footer--visible');
            console.log('up')
        }
        lastScrollTop = st;
      }, false);
    }


}