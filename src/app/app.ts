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
    this.translate.use('fr');
  }
}
