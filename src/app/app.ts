import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NavBarComponent } from './components/nav-bar/nav-bar';

@Component({
  selector: 'hdi-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.html',
})
export class App {
  private translate = inject(TranslateService);

  constructor() {
    // Récupérer la langue depuis localStorage ou utiliser 'fr' par défaut
    const lang = localStorage.getItem('lang') || 'fr';
    this.translate.use(lang);
  }
}
