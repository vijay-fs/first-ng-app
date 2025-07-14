import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Header, Footer],
  template: `
    <app-header />
    <main>
      <app-home />
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`
    main {
      min-height: 100vh;
    }
  `],
})
export class App {
  protected readonly title = signal('first-ng-app');
}
