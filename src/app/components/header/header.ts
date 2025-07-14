import { Component, signal, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import headerData from '@data/header.json';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { WishlistDrawer } from '../wishlist-drawer/wishlist-drawer';
import { CartDrawer } from '../cart-drawer/cart-drawer';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, WishlistDrawer, CartDrawer],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements AfterViewInit {
  headerData = signal(headerData);
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  
  constructor() {}
  
  ngAfterViewInit() {
    // Initialize search popup functionality
    this.initializeSearchPopup();
  }
  
  private initializeSearchPopup() {
    const searchButtons = document.querySelectorAll('.search-button');
    const searchPopup = document.querySelector('.search-popup');
    const searchClose = document.querySelector('.search-popup-close');
    
    searchButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        searchPopup?.classList.add('is-visible');
        setTimeout(() => {
          const searchField = document.getElementById('search-popup') as HTMLInputElement;
          searchField?.focus();
        }, 300);
      });
    });
    
    searchClose?.addEventListener('click', (e) => {
      e.preventDefault();
      searchPopup?.classList.remove('is-visible');
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchPopup?.classList.contains('is-visible')) {
        searchPopup.classList.remove('is-visible');
      }
    });
    
    // Close when clicking outside
    searchPopup?.addEventListener('click', (e) => {
      if (e.target === searchPopup) {
        searchPopup.classList.remove('is-visible');
      }
    });
  }
}
