import { Component, inject, OnInit, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { TokenService } from '../../services/token.service';
import { Signal } from '@angular/core';

import {ApiService} from '../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    imports: [MatIconModule, RouterModule]
})
export class UserComponent {
    user = signal<null|string>(null);
    userName = signal<null|string>(null);
    tokenService: TokenService;
    apiService: ApiService;
    constructor(tokenService: TokenService, apiService: ApiService) { 
        this.tokenService = inject(TokenService);
        this.apiService = inject(ApiService);
    }
    ngOnInit(){
        this.user.set(this.tokenService.getToken());
        if(this.user()!=null){
            this.apiService.getData('user').subscribe({
                next: (res)=>{
                    console.log(res);
                },
                error: (e)=>{
                    console.log(e);
                }
            })
        }
    }
}