import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Cat } from '../../models/cat.model';
import { CatCard } from '../cat-card/cat-card';
import { ApiService } from '../../services/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, finalize } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { Loader } from '../loader/loader';

@Component({
  selector: 'hdi-cats-vs',
  imports: [CatCard, TranslateModule, Loader],
  templateUrl: './cats-vs.html',
  styleUrl: './cats-vs.scss',
})
export class CatsVs {
  @Input() cats: Cat[] = [];
  @Output() newPair = new EventEmitter<void>();

  voteInProgress = false;
  voteError = false;

  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  vote(catId: string) {
    this.voteInProgress = true;
    this.voteError = false;
    this.cdr.detectChanges();

    this.apiService
      .vote(catId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.voteInProgress = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          //Vote enregistré avec succès
          this.newPair.emit();
        },
        error: (error) => {
          console.error("Erreur lors de l'enregistrement du vote:", error);
          this.voteError = true;
        },
      });
  }
}
