import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'checkout',
    loadComponent: () => import('./components/checkout/checkout').then(m => m.Checkout),
    data: { animation: 'CheckoutPage' }
  },
  {
    path: '',
    loadComponent: () => import('./home/home').then(m => m.Home),
    data: { animation: 'HomePage' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
