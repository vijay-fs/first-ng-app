import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  imports: [CommonModule],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss'
})
export class CartDrawer {
  cartService = inject(CartService);
  router = inject(Router);
  
  navigateToCheckout() {
    // Close the cart drawer
    const cartDrawer = document.getElementById('offcanvasCart');
    if (cartDrawer) {
      const bsOffcanvas = (window as any).bootstrap?.Offcanvas?.getInstance(cartDrawer);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
    
    // Navigate to checkout
    this.router.navigate(['/checkout']);
  }
}
