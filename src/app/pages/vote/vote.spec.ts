import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { of, throwError } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { VoteComponent } from './vote';
import { CatsVs } from '../../components/cats-vs/cats-vs';
import { CatsService } from '../../services/cats';

describe('VoteComponent', () => {
  let providers = [provideRouter([]), provideHttpClient(), provideZonelessChangeDetection()];
  let catsServiceMockSuccess: Partial<CatsService>;
  let catsServiceMockError: Partial<CatsService>;

  beforeEach(() => {
    catsServiceMockSuccess = {
      getCats: () =>
        of([
          { id: '1', url: 'url1', score: 0 },
          { id: '2', url: 'url2', score: 0 },
        ]),
    };

    catsServiceMockError = {
      getCats: () => throwError(() => new Error('Erreur de chargement')),
    };
  });

  it('should display <hdi-cats-vs> when catsService returns data', async () => {
    TestBed.overrideProvider(CatsService, { useValue: catsServiceMockSuccess });
    await TestBed.configureTestingModule({
      imports: [VoteComponent, TranslateModule.forRoot(), CatsVs],
      providers,
    }).compileComponents();

    const fixture = TestBed.createComponent(VoteComponent);
    const component = fixture.componentInstance;

    await new Promise((r) => setTimeout(r, 600)); // attendre > 500ms simulé pour delay
    fixture.detectChanges();

    const catsVsEl = fixture.nativeElement.querySelector('hdi-cats-vs');
    expect(catsVsEl).toBeTruthy();
    expect(component.loadError).toBeFalse();
  });

  it('should handle error from catsService and set loadError to true', async () => {
    TestBed.overrideProvider(CatsService, { useValue: catsServiceMockError });
    await TestBed.configureTestingModule({
      imports: [VoteComponent, TranslateModule.forRoot()],
      providers,
    }).compileComponents();

    const fixture = TestBed.createComponent(VoteComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.loadError).toBeTrue();
    const errorEl = fixture.nativeElement.querySelector('.cat-load-error');
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain('LOAD_CAT_ERROR');
  });
});
