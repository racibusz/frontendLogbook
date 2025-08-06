import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenService } from '../token/token.service';
export const guestGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService)
  const token = tokenService.getToken();
  if(token){
    return false;
  }
  return true;
};