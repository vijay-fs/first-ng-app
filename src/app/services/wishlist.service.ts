import { Injectable, signal, computed, inject } from '@angular/core';
import { ToastService } from './toast.service';

export interface WishlistItem {
  id: number;
  title: string;
  price: string;
  image: string;
  priceNumber: number;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems = signal<WishlistItem[]>([]);
  private toastService = inject(ToastService);

  // Computed signals for wishlist statistics
  items = this.wishlistItems.asReadonly();
  totalItems = computed(() => this.wishlistItems().length);

  addToWishlist(product: { id: number; title: string; price: string; image: string }) {
    const priceNumber = parseFloat(product.price.replace('$', ''));
    const existingItem = this.wishlistItems().find(item => item.id === product.id);
    
    if (!existingItem) {
      // Add new item to wishlist
      const newItem: WishlistItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        priceNumber
      };
      this.wishlistItems.update(items => [...items, newItem]);
      this.toastService.success(`"${product.title}" added to wishlist!`);
    }
  }

  removeFromWishlist(productId: number) {
    const item = this.wishlistItems().find(item => item.id === productId);
    if (item) {
      this.wishlistItems.update(items => items.filter(item => item.id !== productId));
      this.toastService.info(`"${item.title}" removed from wishlist`);
    }
  }

  toggleWishlist(product: { id: number; title: string; price: string; image: string }) {
    const existingItem = this.wishlistItems().find(item => item.id === product.id);
    
    if (existingItem) {
      this.removeFromWishlist(product.id);
    } else {
      this.addToWishlist(product);
    }
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems().some(item => item.id === productId);
  }

  clearWishlist() {
    if (this.wishlistItems().length > 0) {
      this.wishlistItems.set([]);
      this.toastService.info('Wishlist cleared');
    }
  }
}