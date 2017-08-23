import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes
  } from '@angular/animations';


export const BACKPANEL_ANIMATION = [trigger('appear', [
    state('in', style({opacity: 1 })),
    transition('void => *', [
      style({
        opacity: 0
      }),
      animate('0.4s 400ms ease-out')
    ])
  ]),
  trigger('appear2', [
    state('in', style({opacity: 1 })),
    transition('void => *', [
      style({
        opacity: 0
      }),
      animate('0.4s 800ms ease-out')
    ])
  ]),
  trigger('appear3', [
    state('in', style({opacity: 1 })),
    transition('void => *', [
      style({
        opacity: 0
      }),
      animate('0.4s 1200ms ease-out')
    ])
  ])


]
