import { HttpHandlerFn, HttpRequest, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const ErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          router.navigate(['/login']);
        } else {
          console.error('Inny błąd HTTP:', error.status, error.message);
        }
      } else {
        console.error('Nieznany błąd:', error);
      }
      return throwError(() => error);
    })
  );
};