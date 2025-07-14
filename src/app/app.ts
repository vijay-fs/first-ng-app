import { Component, signal } from '@angular/core';
import { RouterOutlet, ChildrenOutletContexts } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { ToastComponent } from './components/toast/toast';
import { ScrollToTop } from './components/scroll-to-top/scroll-to-top';
import { routeAnimations } from './animations/route-animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ToastComponent, ScrollToTop],
  animations: [routeAnimations],
  template: `
    <app-header />
    <main [@routeAnimations]="getRouteAnimationData()">
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

  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
