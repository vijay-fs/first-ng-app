import { Injectable, signal, computed, inject } from '@angular/core';
import { ToastService } from './toast.service';

export interface CartItem {
  id: number;
  title: string;
  price: string;
  image: string;
  quantity: number;
  priceNumber: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  private toastService = inject(ToastService);

  // Computed signals for cart statistics
  items = this.cartItems.asReadonly();
  totalItems = computed(() => this.cartItems().reduce((total, item) => total + item.quantity, 0));
  totalPrice = computed(() => 
    this.cartItems().reduce((total, item) => total + (item.priceNumber * item.quantity), 0)
  );

  addToCart(product: { id: number; title: string; price: string; image: string }) {
    const priceNumber = parseFloat(product.price.replace('$', ''));
    const existingItem = this.cartItems().find(item => item.id === product.id);
    
    if (existingItem) {
      // Update quantity if item already exists
      this.cartItems.update(items => 
        items.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      this.toastService.success(`Updated quantity for "${product.title}" in cart!`);
    } else {
      // Add new item to cart
      const newItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
        priceNumber
      };
      this.cartItems.update(items => [...items, newItem]);
      this.toastService.success(`"${product.title}" added to cart!`);
    }
  }

  removeFromCart(productId: number) {
    const item = this.cartItems().find(item => item.id === productId);
    if (item) {
      this.cartItems.update(items => items.filter(item => item.id !== productId));
      this.toastService.info(`"${item.title}" removed from cart`);
    }
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    this.cartItems.update(items => 
      items.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  }

  clearCart() {
    if (this.cartItems().length > 0) {
      this.cartItems.set([]);
      this.toastService.info('Cart cleared');
    }
  }
}