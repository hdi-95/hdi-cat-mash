import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'hdi-footer-btn',
  imports: [TranslateModule, RouterLink, AsyncPipe],
  templateUrl: './footer-btn.html',
  styleUrl: './footer-btn.scss',
})
export class FooterBtn {
  @Input() title: string = '';
  @Input() link: string = '';

  private apiService = inject(ApiService);

  voteCount$ = this.apiService.voteCount$;
}
