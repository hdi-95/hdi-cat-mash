import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  vote(catId: string): Observable<any> {
    return this.http.post('/api/vote', { catId });
  }

  getScores(): Observable<any> {
    return this.http.get('/api/scores');
  }
}
