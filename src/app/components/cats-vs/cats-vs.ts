import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Cat } from '../../models/cat.model';
import { CatCard } from '../cat-card/cat-card';
import { ApiService } from '../../services/api';

@Component({
  selector: 'hdi-cats-vs',
  imports: [CatCard],
  templateUrl: './cats-vs.html',
  styleUrl: './cats-vs.scss',
})
export class CatsVs {
  @Input() cats: Cat[] = [];
  @Output() newPair = new EventEmitter<void>();

  private apiService = inject(ApiService);

  vote(catId: string) {
    console.log('Vote clicked for cat', catId);
    this.apiService.vote(catId).subscribe({
      next: (response) => {
        console.log('Vote enregistré avec succès:', response);
        this.newPair.emit();
      },
      error: (error) => {
        console.error("Erreur lors de l'enregistrement du vote:", error);
      },
    });
  }
}
