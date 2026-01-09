import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private TOKEN_KEY = 'jwtToken';

  private _token = signal<string | null>(this.getToken());

  readonly token = this._token.asReadonly();

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    const token = sessionStorage.getItem(this.TOKEN_KEY);
    return token && token !== 'undefined' ? token : null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
    this._token.set(token);
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(this.TOKEN_KEY);
    }
    this._token.set(null);
  }
}
