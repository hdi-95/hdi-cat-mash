import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hdi-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.scss'],
})
export class NavBarComponent {
  currentLanguage = localStorage.getItem('lang') || 'fr';
  changeLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }
}
