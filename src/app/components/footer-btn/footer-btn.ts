import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'hdi-footer-btn',
  imports: [TranslateModule, RouterLink],
  templateUrl: './footer-btn.html',
  styleUrl: './footer-btn.scss',
})
export class FooterBtn {
  @Input() title: string = '';
  @Input() link: string = '';
}
