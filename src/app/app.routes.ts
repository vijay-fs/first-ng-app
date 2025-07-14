import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'checkout',
    loadComponent: () => import('./components/checkout/checkout').then(m => m.Checkout),
    data: { 
      animation: 'CheckoutPage',
      meta: {
        title: 'Checkout - Kaira',
        description: 'Complete your purchase at Kaira. Secure checkout with fast shipping for premium fashion and lifestyle products.',
        keywords: 'checkout, payment, secure, shipping, kaira, purchase, fashion, shopping cart'
      }
    }
  },
  {
    path: '',
    loadComponent: () => import('./home/home').then(m => m.Home),
    data: { 
      animation: 'HomePage',
      meta: {
        title: 'Kaira - Premium Fashion & Lifestyle',
        description: 'Discover premium fashion and lifestyle products at Kaira. Shop curated collections of clothing, accessories, and lifestyle essentials.',
        keywords: 'fashion, lifestyle, premium, clothing, accessories, shopping, style, trends, kaira, home, collection'
      }
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
