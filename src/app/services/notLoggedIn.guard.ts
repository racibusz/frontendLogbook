import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../services/token.service';
export const notLoggedInGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  const tokenService = inject(TokenService);
  const token = tokenService.getToken();
  const router = inject(Router);

  if (token) {
    return router.parseUrl('/dashboard');
  }
  else{
    return true;
  }
};
