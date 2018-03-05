import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export const PROJECT_ANIMATION = [trigger('appear', [
  state('in', style({opacity: 1})),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'scale(0,0)'
    }),
    animate('0.4s 400ms ease-out')
  ])
]),
  trigger('appear2', [
    state('in', style({opacity: 1})),
    transition('void => *', [
      style({
        opacity: 0
      }),
      animate('0.4s 800ms ease-out')
    ])
  ]),
  trigger('appear3', [
    state('in', style({opacity: 1})),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'scale(1,1)'
      }),
      animate('0.4s 1200ms ease-out')
    ])
  ])

];
