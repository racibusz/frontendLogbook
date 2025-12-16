import { Component } from '@angular/core';
import { LogoComponent } from '../../logo/logo.component';
import { UserComponent } from '../../user/user.component';
import { TokenService } from '../../../services/token.service';
import { signal } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    imports: [LogoComponent, UserComponent, RouterModule, MatToolbarModule],
    standalone: true
})
export class NavbarComponent {
    loggedIn = signal(false);

    constructor(private tokenService: TokenService) {}

    ngOnInit() {
        this.loggedIn.set(this.tokenService.getToken() != null);
    }
}
