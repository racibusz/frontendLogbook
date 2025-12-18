import { Component, computed, signal, ɵsetAlternateWeakRefImpl } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from './services/token.service';
import {NavbarComponent} from './components/navigation/navbar/navbar.component';
import {SidenavComponent} from './components/navigation/sidenav/sidenav.component';

import { FooterComponent } from './components/navigation/footer/footer.component';
import {MatSidenavModule} from '@angular/material/sidenav';
@Component({
    selector: 'app-root',
    imports: [RouterModule, NavbarComponent, FooterComponent, MatSidenavModule, SidenavComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  isMobile = signal(false);
  isLoggedIn = signal(false);
  sideNavOpened = signal(false);
  constructor(private router: Router, private tokenService: TokenService){
  }
  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.checkIfMobile();
    }
    this.isLoggedIn.set(this.tokenService.getToken() != null);
  }
  checkIfMobile() {
    this.isMobile.set(window.innerWidth < 768);
    window.addEventListener('resize', () => {
      this.isMobile.set(window.innerWidth < 768);
    });
  }
}
