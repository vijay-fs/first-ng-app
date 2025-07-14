import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1055;">
      <div 
        *ngFor="let toast of toastService.toasts$()" 
        class="toast show align-items-center border-0 mb-2"
        [ngClass]="getToastClass(toast.type)"
        [@slideIn]
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center">
            <svg class="me-2" width="18" height="18" viewBox="0 0 24 24">
              <use [attr.xlink:href]="getIcon(toast.type)"></use>
            </svg>
            {{ toast.message }}
          </div>
          <button 
            type="button" 
            class="btn-close btn-close-white me-2 m-auto" 
            (click)="toastService.remove(toast.id)"
            aria-label="Close"></button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      max-width: 350px;
    }
    
    .toast {
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
    }
    
    .toast-success {
      background-color: rgba(140, 144, 126, 0.95);
      color: var(--bs-light);
    }
    
    .toast-error {
      background-color: rgba(33, 37, 41, 0.95);
      color: var(--bs-light);
    }
    
    .toast-warning {
      background-color: rgba(154, 161, 167, 0.95);
      color: var(--bs-black);
    }
    
    .toast-info {
      background-color: rgba(108, 117, 125, 0.95);
      color: var(--bs-light);
    }
    
    .toast-body {
      padding: 12px 16px;
    }
    
    .btn-close-white {
      filter: brightness(0) invert(1);
    }
    
    .toast-warning .btn-close-white {
      filter: brightness(0) invert(0);
    }
    
    .btn-close:hover {
      opacity: 0.7;
    }
    
    svg {
      fill: currentColor;
    }
  `],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ToastComponent {
  toastService = inject(ToastService);

  getToastClass(type: string): string {
    return `toast-${type}`;
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return '#check-circle';
      case 'error':
        return '#x-circle';
      case 'warning':
        return '#exclamation-triangle';
      case 'info':
      default:
        return '#info-circle';
    }
  }
}