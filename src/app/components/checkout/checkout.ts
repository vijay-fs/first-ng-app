import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)', opacity: 1 }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('bounce', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('pulse', [
      state('normal', style({ transform: 'scale(1)' })),
      state('pulse', style({ transform: 'scale(1.05)' })),
      transition('normal <=> pulse', animate('200ms ease-in-out'))
    ])
  ]
})
export class Checkout {
  cartService = inject(CartService);
  
  // Form data
  customerInfo = signal({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  shippingAddress = signal({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  
  // UI states
  isProcessing = signal(false);
  showSuccess = signal(false);
  processingStep = signal(0);
  pulseState = signal('normal');
  
  // Order data captured before clearing cart
  orderData = signal({
    totalItems: 0,
    totalAmount: '0.00',
    items: [] as any[]
  });
  
  // Animation timing
  private processingSteps = [
    'Validating order...',
    'Processing payment...',
    'Confirming inventory...',
    'Preparing shipment...'
  ];
  
  getCurrentStep(): string {
    return this.processingSteps[this.processingStep()] || 'Processing...';
  }
  
  async processOrder() {
    this.isProcessing.set(true);
    this.pulseState.set('pulse');
    
    // Capture cart data before clearing
    this.orderData.set({
      totalItems: this.cartService.totalItems(),
      totalAmount: this.cartService.totalPrice().toFixed(2),
      items: [...this.cartService.items()]
    });
    
    // Simulate processing steps with animations
    for (let i = 0; i < this.processingSteps.length; i++) {
      this.processingStep.set(i);
      await this.delay(1000);
    }
    
    // Show success
    this.isProcessing.set(false);
    this.showSuccess.set(true);
    this.pulseState.set('normal');
    
    // Clear cart after successful order
    this.cartService.clearCart();
    
    // Success message will persist until user navigates away
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  
  updateCustomerInfo(field: string, value: string) {
    this.customerInfo.update(info => ({ ...info, [field]: value }));
  }
  
  updateShippingAddress(field: string, value: string) {
    this.shippingAddress.update(address => ({ ...address, [field]: value }));
  }
  
  isFormValid(): boolean {
    const info = this.customerInfo();
    const address = this.shippingAddress();
    
    // Only require essential fields: firstName, lastName, email, address, city
    return !!(info.firstName && info.lastName && info.email &&
             address.address && address.city);
  }
  
  generateOrderNumber(): string {
    return 'ORD' + Date.now().toString().slice(-8);
  }
  
  getItemTotal(item: any): string {
    const price = parseFloat(item.price.replace('$', ''));
    return (price * item.quantity).toFixed(2);
  }
}
