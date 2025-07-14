import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import footerData from '@data/footer.json';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  footerData = signal(footerData);
  
  constructor() {}
}
