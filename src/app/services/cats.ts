import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from '../models/cat.model';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  private http = inject(HttpClient);
  private apiUrl = '/json/cats.json';

  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.apiUrl);
  }
}
