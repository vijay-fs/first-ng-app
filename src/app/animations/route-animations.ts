import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ 
        transform: 'translateY(100%)',
        opacity: 0
      })
    ], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', style({ 
          transform: 'translateY(-100%)',
          opacity: 0
        }))
      ], { optional: true }),
      query(':enter', [
        animate('500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', style({ 
          transform: 'translateY(0%)',
          opacity: 1
        }))
      ], { optional: true }),
    ]),
    query(':enter', animateChild(), { optional: true }),
  ])
]);