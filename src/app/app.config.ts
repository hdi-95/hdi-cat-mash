import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateLoader as TranslateLoaderInterface,
  TranslateModule,
} from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { routes } from './app.routes';

// Custom Translate Loader pour charger les fichiers JSON
export class CustomTranslateHttpLoader implements TranslateLoaderInterface {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./locales/${lang}.json`);
  }
}

// Factory pour instancier le loader
export function translateHttpLoaderFactory(http: HttpClient) {
  return new CustomTranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),

    ...(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }).providers ?? []),
  ],
};
