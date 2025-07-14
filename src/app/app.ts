import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, HeaderComponent, FooterComponent],
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
