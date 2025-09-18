import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { delay, finalize } from 'rxjs';
import { CatsVs } from '../../components/cats-vs/cats-vs';
import { FooterBtn } from '../../components/footer-btn/footer-btn';
import { Loader } from '../../components/loader/loader';
import { Cat } from '../../models/cat.model';
import { CatsService } from '../../services/cats';

@Component({
  selector: 'hdi-vote',
  standalone: true,
  imports: [CommonModule, Loader, TranslateModule, FooterBtn, CatsVs],
  templateUrl: './vote.html',
  styleUrls: ['./vote.scss'],
})
export class VoteComponent {
  cats: Cat[] = [];
  currentPair: Cat[] = [];
  loading = true;
  loadError = false;
  private catsService = inject(CatsService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.getCats();
  }

  getCats() {
    this.loading = true;
    this.loadError = false;

    this.catsService
      .getCats()
      .pipe(
        delay(500), // Simule un délai pour le loader
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          // Données chats reçues
          this.cats = data;
          this.generatePair();
        },
        error: (err) => {
          // Erreur chargement chats
          this.loadError = true;
        },
      });
  }

  generatePair() {
    // Génère une paire aléatoire de chats
    if (this.cats.length < 2) {
      this.currentPair = [];
      // Pas assez de chats pour générer une paire.
      return;
    }
    const shuffled = [...this.cats].sort(() => 0.5 - Math.random());
    this.currentPair = shuffled.slice(0, 2);
  }
}
