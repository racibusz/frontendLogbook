import { Component, computed, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from './services/token.service';
import {NavbarComponent} from './components/navigation/navbar/navbar.component';

import { FooterComponent } from './components/navigation/footer/footer.component';
@Component({
    selector: 'app-root',
    imports: [RouterModule, NavbarComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router, private tokenService: TokenService){
    
  }
}
