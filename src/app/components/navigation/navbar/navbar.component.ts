import { Component, Signal } from '@angular/core';
import { LogoComponent } from '../../logo/logo.component';
import { UserComponent } from '../../user/user.component';
import { TokenService } from '../../../services/token.service';
import {MatToolbarModule} from '@angular/material/toolbar'
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { WritableSignal } from '@angular/core';
import { Input } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    imports: [LogoComponent, UserComponent, RouterModule, MatToolbarModule, MatIconModule, CommonModule, MatButtonModule, UserComponent],
    standalone: true
})
export class NavbarComponent {
    @Input() loggedIn!: Signal<boolean>;
    @Input() isMobile!: WritableSignal<boolean>;
    @Input() sideNavOpened!: WritableSignal<boolean>;

    constructor(private tokenService: TokenService) {}


}
