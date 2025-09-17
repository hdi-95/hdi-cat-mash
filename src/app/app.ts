import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar';

@Component({
  selector: 'hdi-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.html',
})
export class App {}
