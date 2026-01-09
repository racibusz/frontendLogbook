import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout-page',
    templateUrl: './logoutPage.component.html',
    styleUrls: ['./logoutPage.component.scss']
})
export class LogoutPageComponent {
    constructor(private tokenService: TokenService, private router:Router) {}
    ngOnInit(): void {
        this.tokenService.removeToken();
        this.router.navigate(['/login']);
    }
}