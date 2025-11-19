import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, catchError, delay, of, switchMap, tap } from 'rxjs';
import { CatsVs } from '../../components/cats-vs/cats-vs';
import { FooterBtn } from '../../components/footer-btn/footer-btn';
import { Loader } from '../../components/loader/loader';
import { CatsService } from '../../services/cats';

@Component({
  selector: 'hdi-vote',
  standalone: true,
  imports: [CommonModule, Loader, TranslateModule, FooterBtn, CatsVs],
  templateUrl: './vote.html',
  styleUrls: ['./vote.scss']
})
export class VoteComponent {

  private catsService = inject(CatsService);
  private destroyRef = inject(DestroyRef);

  // Signals pour l'état UI
  loading = signal(true);
  loadError = signal(false);

  // Subject pour déclencher le rechargement
  private refresh$ = new BehaviorSubject<void>(undefined);

  // Flux de données principal
  currentPair = toSignal(this.refresh$.pipe(
    tap(() => {
      this.loading.set(true);
      this.loadError.set(false);
    }),
    switchMap(() =>
      this.catsService.getRandomPair().pipe(
        // Petit délai artificiel pour voir le loader (optionnel, à retirer en prod si besoin)
        delay(500),
        tap(() => this.loading.set(false)),
        catchError((err) => {
          console.error('Error loading cats:', err);
          this.loading.set(false);
          this.loadError.set(true);
          return of([]); // Retourne un tableau vide en cas d'erreur pour ne pas casser le flux
        })
      )
    ),
    takeUntilDestroyed()
  ));

  generatePair() {
    this.refresh$.next();
  }


}
