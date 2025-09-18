import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
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
}
