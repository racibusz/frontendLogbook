import { Component, computed, signal, ɵsetAlternateWeakRefImpl } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from './services/token.service';
import {NavbarComponent} from './components/navigation/navbar/navbar.component';
import {SidenavComponent} from './components/navigation/sidenav/sidenav.component';
import { FooterComponent } from './components/navigation/footer/footer.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MobileDetector} from './services/mobileDetector';
@Component({
    selector: 'app-root',
    imports: [RouterModule, NavbarComponent, FooterComponent, MatSidenavModule, SidenavComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router){}
  private tokenService = inject(TokenService);
  mobileDetector = inject(MobileDetector)
  isMobile = this.mobileDetector.isMobile;
  sideNavOpened = signal(false);
  token = this.tokenService.token;
  isLoggedIn = computed(() => this.token() != null);
}