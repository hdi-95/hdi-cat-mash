import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FooterBtn } from '../../components/footer-btn/footer-btn';
import { ApiService } from '../../services/api';

@Component({
  selector: 'hdi-scores',
  standalone: true,
  imports: [CommonModule, FooterBtn, TranslateModule],
  templateUrl: './scores.html',
  styleUrls: ['./scores.scss'],
})
export class ScoresComponent implements OnInit {
  scores: any[] = [];

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.apiService.getScores().subscribe((data) => {
      this.scores = data;
      console.log('Scores reçus:', this.scores);
    });
  }
}
