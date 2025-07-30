import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token/token.service';
export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService)
  const token = tokenService.getToken();
  if(token){
    return true;
  }
  const router = inject(Router);
  return router.parseUrl("/login");
};

// TODO: Find a way to store JWT TOKEN, that works!
