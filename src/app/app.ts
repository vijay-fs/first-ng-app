import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent],
  template: `
    <app-home />
    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('first-ng-app');
}
