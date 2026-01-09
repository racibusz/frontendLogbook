import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileDetector {
  isMobile = signal(false);
  constructor() {
    if (typeof window !== 'undefined') {
      this.checkIfMobile();
      window.addEventListener('resize', () => this.checkIfMobile());
    }
  }
  private checkIfMobile() {
    this.isMobile.set(window.innerWidth < 768);
  }
}