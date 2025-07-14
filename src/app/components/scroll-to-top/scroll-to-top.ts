import { Component, OnInit, OnDestroy, signal, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-scroll-to-top',
  imports: [CommonModule],
  templateUrl: './scroll-to-top.html',
  styleUrl: './scroll-to-top.scss',
  animations: [
    trigger('slideIn', [
      state('hidden', style({ 
        transform: 'translateY(100px)',
        opacity: 0
      })),
      state('visible', style({ 
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('hidden <=> visible', animate('300ms ease-in-out'))
    ]),
    trigger('bounce', [
      transition('* => *', [
        animate('200ms ease-in', style({ transform: 'scale(0.9)' })),
        animate('200ms ease-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class ScrollToTop implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  
  isVisible = signal(false);
  bounceState = signal(0);
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeScrollListener();
    }
  }
  
  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
  
  private initializeScrollListener() {
    window.addEventListener('scroll', this.handleScroll);
  }
  
  private handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isVisible.set(scrollTop > 300);
  }
  
  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      // Trigger bounce animation
      this.bounceState.update(state => state + 1);
      
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}