import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';

import { CatsPodium } from '../../components/cats-podium/cats-podium';
import { ApiService } from '../../services/api';
import { CatsService } from '../../services/cats';
import { ScoresComponent } from './scores';

describe('ScoresComponent', () => {
  let providers = [provideRouter([]), provideHttpClient(), provideZonelessChangeDetection()];
  let apiServiceMockSuccess: Partial<ApiService>;
  let apiServiceMockError: Partial<ApiService>;
  let catsServiceMock: Partial<CatsService>;

  beforeEach(() => {
    apiServiceMockSuccess = {
      getScores: () =>
        of({
          scores: [
            { cat_id: '1', score: 0 },
            { cat_id: '2', score: 0 },
          ],
        }),
    };

    apiServiceMockError = {
      getScores: () => throwError(() => new Error('Erreur de chargement')),
    };

    catsServiceMock = {
      getCats: () =>
        of([
          { id: '1', url: 'url1', score: 0 },
          { id: '2', url: 'url2', score: 0 },
        ]),
    };
  });

  it('should display <hdi-cats-podium> when apiService returns data', async () => {
    TestBed.overrideProvider(ApiService, { useValue: apiServiceMockSuccess });
    TestBed.overrideProvider(CatsService, { useValue: catsServiceMock });
    await TestBed.configureTestingModule({
      imports: [ScoresComponent, TranslateModule.forRoot(), CatsPodium],
      providers,
    }).compileComponents();

    const fixture = TestBed.createComponent(ScoresComponent);
    const component = fixture.componentInstance;

    await new Promise((r) => setTimeout(r, 600)); // attendre > 500ms simulé pour delay
    fixture.detectChanges();

    const catsPodiumEl = fixture.nativeElement.querySelector('hdi-cats-podium');
    expect(catsPodiumEl).toBeTruthy();
    expect(component.loadError).toBeFalse();
  });

  it('should handle error from apiService and set loadError to true', async () => {
    spyOn(console, 'error'); // Empêche l'erreur de s'afficher dans la console des tests
    TestBed.overrideProvider(ApiService, { useValue: apiServiceMockError });
    TestBed.overrideProvider(CatsService, { useValue: catsServiceMock });
    await TestBed.configureTestingModule({
      imports: [ScoresComponent, TranslateModule.forRoot()],
      providers,
    }).compileComponents();

    const fixture = TestBed.createComponent(ScoresComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.loadError).toBeTrue();
    const errorEl = fixture.nativeElement.querySelector('.score-load-error');
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain('LOAD_SCORE_ERROR');
  });
});
