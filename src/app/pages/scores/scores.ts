import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { FooterBtn } from '../../components/footer-btn/footer-btn';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'hdi-scores',
  standalone: true,
  imports: [CommonModule, FooterBtn, TranslateModule],
  templateUrl: './scores.html',
  styleUrls: ['./scores.scss'],
})
export class ScoresComponent implements OnInit {
  scores: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getScores().subscribe((data) => {
      this.scores = data;
    });
  }
}
