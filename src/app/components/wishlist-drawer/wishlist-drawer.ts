import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-wishlist-drawer',
  imports: [CommonModule],
  templateUrl: './wishlist-drawer.html',
  styleUrl: './wishlist-drawer.scss'
})
export class WishlistDrawer {
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  moveToCart(item: any) {
    this.cartService.addToCart(item);
    this.wishlistService.removeFromWishlist(item.id);
  }

  openCartDrawer() {
    // Close wishlist drawer first
    const wishlistDrawer = document.getElementById('offcanvasWishlist');
    if (wishlistDrawer) {
      const bsOffcanvas = (window as any).bootstrap?.Offcanvas?.getInstance(wishlistDrawer);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }

    // Open cart drawer after a short delay to allow wishlist to close
    setTimeout(() => {
      const cartDrawer = document.getElementById('offcanvasCart');
      if (cartDrawer) {
        const bsOffcanvas = new (window as any).bootstrap.Offcanvas(cartDrawer);
        bsOffcanvas.show();
      }
    }, 300);
  }
}
