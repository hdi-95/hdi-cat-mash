import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CatScore } from '../models/cat-score.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private voteCountSubject = new BehaviorSubject<number>(0);
  voteCount$ = this.voteCountSubject.asObservable();

  private scoreUrl = '/api/scores';
  // private scoreUrl = 'json/scores.json'; // Pour le développement local

  vote(catId: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>('/api/vote', { catId }).pipe(
      tap(() => {
        this.voteCountSubject.next(this.voteCountSubject.value + 1);
      })
    );
  }

  getScores(): Observable<{ scores: CatScore[] }> {
    return this.http.get<{ scores: CatScore[] }>(this.scoreUrl);
  }
}
