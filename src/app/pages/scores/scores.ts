import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { catchError, combineLatest, delay, EMPTY, finalize } from 'rxjs';
import { CatsGrid } from '../../components/cats-grid/cats-grid';
import { CatsPodium } from '../../components/cats-podium/cats-podium';
import { FooterBtn } from '../../components/footer-btn/footer-btn';
import { Loader } from '../../components/loader/loader';
import { Cat } from '../../models/cat.model';
import { ApiService } from '../../services/api';
import { CatsService } from '../../services/cats';

@Component({
  selector: 'hdi-scores',
  standalone: true,
  imports: [CommonModule, FooterBtn, TranslateModule, CatsPodium, CatsGrid, Loader],
  templateUrl: './scores.html',
  styleUrls: ['./scores.scss'],
})
export class ScoresComponent implements OnInit {
  podium: Cat[] = [];
  others: Cat[] = [];
  loading = true;
  loadError = false;

  private apiService = inject(ApiService);
  private catsService = inject(CatsService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getScores();
  }

  getScores() {
    this.loading = true;
    this.loadError = false;

    combineLatest([this.catsService.getCats(), this.apiService.getScores()])
      .pipe(
        delay(500), // Simule un délai pour le loader
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          console.error('Error fetching scores or cats', error);
          this.loadError = true;
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )

      .subscribe(([cats, scoreData]) => {
        const scores = scoreData.scores || [];

        const catsWithScores = cats.map((cat) => {
          const foundScore = scores.find((s) => s.cat_id === cat.id);
          return { ...cat, score: foundScore ? foundScore.score : 0 };
        });

        catsWithScores.sort((a: Cat, b: Cat) => b.score - a.score);

        this.podium = catsWithScores.slice(0, 3);
        this.others = catsWithScores.slice(3);
      });
  }
}
