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

    //   var lastScrollTop = 0;
    //   let footer=document.querySelector('div#footer');

    //   window.addEventListener("scroll", function(){ 
    //     var st = window.pageYOffset || document.documentElement.scrollTop; 
    //     if (st > lastScrollTop){
    //         footer.classList.add('footer--visible');
    //         console.log('down')
    //     } else {
    //          footer.classList.remove('footer--visible');
    //         console.log('up')
    //     }
    //     lastScrollTop = st;
    //   }, false);
     }


}