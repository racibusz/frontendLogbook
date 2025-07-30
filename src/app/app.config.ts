import { ApplicationConfig, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { platformBrowser, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/auth.interceptor';
import { TokenService } from './token/token.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),
    provideHttpClient(),
    // { provide: PLATFORM_ID, useValue: platformBrowser() },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    TokenService
  ],
};
