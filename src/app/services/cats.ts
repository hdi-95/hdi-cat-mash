import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Cat } from '../models/cat.model';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  private http = inject(HttpClient);
  private apiUrl = '/json/cats.json';

  private cats$ = this.http.get<Cat[]>(this.apiUrl).pipe(
    shareReplay(1) // cache la réponse et la rejoue pour les prochains abonnés
  );

  getCats(): Observable<Cat[]> {
    return this.cats$;
  }

  // Il gère la logique et l'état des données
  getRandomPair(): Observable<Cat[]> {
    return this.cats$.pipe(
      map(cats => {
        // La logique de mélange est ICI, isolée et testable
        const shuffled = [...cats].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 2);
      })
    );
  }

}
