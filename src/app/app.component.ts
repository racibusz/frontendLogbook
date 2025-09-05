import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SideNavComponent } from '../components/side-nav/sidenav.component';
import { CountUpModule } from "ngx-countup"
import { filter } from 'rxjs';
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CountUpModule, SideNavComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';
  showSideNav = signal(true);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const hiddenRoutes = ['/', '/login', '/logout']; // trasy BEZ sidenav
        this.showSideNav.set(!hiddenRoutes.includes(event.urlAfterRedirects));
      });
  }
}
