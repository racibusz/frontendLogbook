import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { TokenService } from '../../services/token.service';
import { Signal } from '@angular/core';

import {ApiService} from '../../services/api.service';
import { RouterModule } from '@angular/router';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    imports: [MatIconModule, RouterModule, MatMenuModule, MatButtonModule]
})
export class UserComponent {

    private tokenService = inject(TokenService);
    private apiService = inject(ApiService);
    token = this.tokenService.token;
}