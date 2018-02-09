import {Directive, ElementRef} from '@angular/core';

@Directive({selector: '[trimtext]'})

export class TrimTextDirective {
  constructor(el: ElementRef) {
    console.log(el.nativeElement.innerText);
  }
}
