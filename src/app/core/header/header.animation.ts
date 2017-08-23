import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';


export const HEADER_ANIMATION = trigger('flyInOut', [
        state('in', style({transform: 'translateY(0)'})),
        transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        animate('0.2s 200ms ease-out')
    ])
  ])