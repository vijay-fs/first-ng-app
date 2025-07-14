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
}
