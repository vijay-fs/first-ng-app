import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss'
})
export class CartDrawer {
  cartService = inject(CartService);
  router = inject(Router);
}
