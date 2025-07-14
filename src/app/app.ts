import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { ToastComponent } from './components/toast/toast';
import { ScrollToTop } from './components/scroll-to-top/scroll-to-top';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ToastComponent, ScrollToTop],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer />
    <app-toast />
    <app-scroll-to-top />
  `,
  styles: [`
    main {
      min-height: 100vh;
      max-width: 100wh;
      padding: 0 1rem;
      overflow: hidden;
    }
  `],
})
export class App {
  protected readonly title = signal('kaira');
}
